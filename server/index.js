/**
 * Created by nsubbot on 02.08.17.
 */

"use strict";
//  Existed node modules
let http = require('http');
let util = require('util');
let log = require('winston');
let EventEmitter = require('events').EventEmitter;
let path = require('path');
let fs = require('fs');
let url = require('url');
let room = require('../custom_modules/transformers_room');

//  Custom project node modules
let decepticon = require('../custom_modules/decepticon');
let autobot = require('../custom_modules/autobot');
let error = require('../custom_modules/errors');
let data_base = require("../custom_modules/localization");
data_base.connect();


let temp = __dirname.split("/server");
temp.length = temp.length -1;
let ROOT = temp + "/public";
debugger;

let server = new http.createServer(function (req, res) {
    let urlParsed = url.parse(req.url, true);

    switch (urlParsed.pathname) {
        case "/" :
            let creationPath = "/creation/index.html";
            sendFileSave(creationPath, res);
            break;
        case "/creation" :
            sendFileSave(creationPath, res);
            break;
        case "/transformers_room":
            let transformersRoomPath = "/transformers_room/index.html";
            sendFileSave(transformersRoomPath, res);
            break;
        case "/battle":
            let battlePath = "/battle/index.html";
            sendFileSave(battlePath, res);
            break;


        case "/subscribe":
            room.subscribe(req, res);
            break;
        case "/publish":
            let body = "";
            req
                .on('readable', function () {
                    let content = req.read();
                    if(content != null)
                    body += content;
                    if (body.length > 1e4) {
                        res.statusCode = 413;
                        log.error("big incoming file");
                        res.end("u fucking bitch can't destroy my server")
                    }
                })
                .on('end', function () {
                    try {
                        let newTransformer = JSON.parse(body);
                    } catch (exeption) {
                        res.statusCode = 400;
                        log.error("not falid json-file in input");
                    }
                    if(newTransformer.type === "Autobot"){
                        let newAutobot = new autobot.Autobot(newTransformer.name, newTransformer.home_planet, newTransformer.attack, newTransformer.health);
                        room.publish(newAutobot);
                    } else if(newTransformer.type === "Decepticon") {
                        let newDecepticon = new decepticon.Decepticon(newTransformer.name, newTransformer.home_planet, newTransformer.attack, newTransformer.health);
                        room.publish(newDecepticon);
                    } else {
                        log.error("transformer type not supported");
                        room.publish("not supported type");
                    }
                    res.end('ok');
            });
            break;
    }

    // Old war in 4 options: auto+dec / only auto / only dec / no one
    // if(urlParsed.pathname == "/transformers" && urlParsed.query.autobot && urlParsed.query.decepticon){
    //     res.setHeader('Cache-control', 'no-cache');
    //     var autobotAndDecepticonBattlePath = 'battle/index.html';
    //     sendFileSave(autobotAndDecepticonBattlePath, res);
    // } else {
    //     if(urlParsed.pathname == "/transformers" && (urlParsed.query.autobot || urlParsed.query.decepticon)) {
    //         if(urlParsed.query.autobot){
    //             debugger;
    //             log.error('shit');
    //             var autobotChar = new autobot.Autobot(urlParsed.query.autobot, 'Cibertrone', 5, 100);
    //             var autobotOnlyPath = "only_autobot/index.html";
    //             sendFileSave(autobotOnlyPath, res);
    //             /*res.end('You need one more transformer to start battle!\n' + 'On battle platform only ' + autobotChar.name + "." + '\n' + 'And he is AUTOBOT!');*/
    //         } else {
    //             debugger;
    //             var decepticonChar = new decepticon.Decepticon(urlParsed.query.decepticon, 'Cibertrone', 5, 100);
    //             var decepticonOnlyPath = "only_decepticon/index.html";
    //             sendFileSave(decepticonOnlyPath, res);
    //             /*res.end('You need one more transformer to start battle!\n' + 'On battle platform only ' + decepticonChar.name + "." + "\n" + "And he is DECEPTICON!");*/
    //         }
    //     } else {
    //         //TODO Check if-else circle - ?always execute this block?
    //         log.error('trans not found here');
    //         res.statusCode = 404;
    //         res.end("No transformers war here!");
    //     }
    // }
});

function sendFileSave(filePath, res) {

    //Decode url path
    try {
        filePath = decodeURIComponent(filePath);
    } catch (exeption) {
        res.statusCode = 400;
        log.error("Incorrect URL");
        res.end("Bad Request.");
        throw new error.NotSaveSandingFile(400, "Decoding client URL failed.");
        return;
    }

    //Checking zero-element in URL ??? //TODO wtf is this
    if (~filePath.indexOf('\0')) {
         res.statusCode = 400;
         log.error("Incorrect URL");
         res.end('Bad request.');
         throw new error.NotSaveSandingFile(400, "Zero-element in URL");
         return;
    }

    // Changing path
    filePath = path.normalize(path.join(ROOT, filePath));

    //  Checking files in path
    if(filePath.indexOf(ROOT) != 0) {
        res.statusCode = 404;
        log.error("Incorrect URL");
        res.end('File not found');
        throw new error.NotSaveSandingFile(404, "Not correct local path")
        return;
    }

    //  Checking existence of files
    fs.stat(filePath, function (err, stats) {
        if(err || !stats.isFile()) {
            res.statusCode = 404;
            log.error("Incorrect URL");
            res.end("File not found");
            throw new error.NotSaveSandingFile(404, "Requested files not exist.")
            return;
        }
    })

    sendFile(filePath, res);
};

function sendFile(filePath, res) {

    fs.readFile(filePath, function (err, content) {
        if (err)
            throw new error.NotSaveSandingFile(404, "Incorrect path of directory");
        var mime = require('mime').lookup(filePath);
        res.setHeader('Content-Type', mime + "; charset=utf-8");
        res.end(content);
    })
}

module.exports = server;