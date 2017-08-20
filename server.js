/**
 * Created by nsubbot on 02.08.17.
 */

"use strict";

//  Existed node modules
var http = require('http');                         //Http server
var util = require('util');                         //Util module
var log = require('winston');                     //Logger module
var EventEmitter = require('events').EventEmitter;  //EventEmitter module
var path = require('path');
var fs = require('fs');
var url = require('url');                           //Url parser module

//  Custom project node modules
var decepticon = require('./decepticon');           //Decepticon class
var autobot = require('./autobot');                 //Autobots class
var error = require('./errors');
var data_base = require("./data_base");
data_base.connect();

//var server = new http.Server();     //EventEmitter
//server.listen(1707, "localhost");

var ROOT = __dirname + "/public";

http.createServer(function (req, res) {


    //console.log(req.method, req.url);
    var urlParsed = url.parse(req.url, true);
    //console.log(urlParsed);


    //Transformers objects
    if(urlParsed.pathname == "/transformers" && urlParsed.query.autobot && urlParsed.query.decepticon){
        //var optimus = new autobot.Autobot(urlParsed.query.autobot, "Cibertrone", 5, 100);
        //var megatrone = new decepticon.Decepticon(urlParsed.query.decepticon, "Cibertrone", 5, 100);
        //debugger;
        //log.info("transformers created");

        //inspect objects
        //console.log(util.inspect(optimus));
        //console.log(util.inspect(megatrone));
        //console.log(util.inspect(bumblebee));
    hello
        res.setHeader('Cache-control', 'no-cache');
        var autobotAndDecepticonBattlePath = 'battle/index.html';
        sendFileSave(autobotAndDecepticonBattlePath, res);
    } else {
        if(urlParsed.pathname == "/transformers" && (urlParsed.query.autobot || urlParsed.query.decepticon)) {
            if(urlParsed.query.autobot){
                debugger;
                log.error('shit');
                var autobotChar = new autobot.Autobot(urlParsed.query.autobot, 'Cibertrone', 5, 100);
                var autobotOnlyPath = "only_autobot/index.html";
                sendFileSave(autobotOnlyPath, res);
                /*res.end('You need one more transformer to start battle!\n' + 'On battle platform only ' + autobotChar.name + "." + '\n' + 'And he is AUTOBOT!');*/
            } else {
                debugger;
                var decepticonChar = new decepticon.Decepticon(urlParsed.query.decepticon, 'Cibertrone', 5, 100);
                var decepticonOnlyPath = "only_decepticon/index.html";
                sendFileSave(decepticonOnlyPath, res);
                /*res.end('You need one more transformer to start battle!\n' + 'On battle platform only ' + decepticonChar.name + "." + "\n" + "And he is DECEPTICON!");*/
            }
        } else {
            //TODO Check if-else circle - ?always execute this block?
            log.error('trans not found here');
            res.statusCode = 404;
            res.end("No transformers war here!");
        }
    }
}).listen(1707);

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