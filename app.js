/**
 * transformers
 * Created by nsubbot on 20.08.17.
 * All rights reserved by Nikita Subbot ©
 */

let http = require('http');
let express = require('express');
let log = require('winston');
let url = require('url');
let fs = require('fs');
let path = require('path');

// Custom modules
let config = require('config');
let decepticon = require('./custom_modules/decepticon');
let autobot = require('./custom_modules/autobot');
let error = require('./custom_modules/errors');
let transformers_room = require('./custom_modules/transformers_room');
let localization = require("./custom_modules/localization");
localization.connect();

// Domain module
let domain = require('domain');
let serverDomain = domain.create();

serverDomain.on('error', function (err) {
    log.error("Domain catch error: %s", err);
});

let ROOT = __dirname + "/templates";

serverDomain.run(function () {

    //Old server connection
    //var server = require('./server');
    //server.listen(config.get('port'));

    //Express connection
    let app = express();
    app.set('port', config.get('port'));

    http.createServer(app).listen(app.get('port'), function () {
        console.log("Express server listening on port " + app.get('port'));
    });

    app.use(function (req, res, next) {
        if(req.url === "/") {
            let creationPath = "/creation/index.html";
            sendFileSave(creationPath, res);
        } else {
            next();
        }
    });


    app.use(function (req, res, next) {
        if(req.url === "/creation") {
            let creationPath = "/creation/index.html";
            sendFileSave(creationPath, res);
        }
        else {
            next();
        }
    });

    app.use(function (req, res, next) {
        if(req.url === "/transformers_room") {
            let transformersRoomPath = "/transformers_room/index.html";
            sendFileSave(transformersRoomPath, res);
        }
        else {
            next();
        }
    });

    app.use(function (req, res, next) {
        if(req.url === "/battle") {
            let battlePath = "/battle/index.html";
            sendFileSave(battlePath, res);
        }
        else {
            next();
        }
    });

    app.use(function (req, res, next) {
        if(req.url === "/subscribe") {
            transformers_room.subscribe(req, res);
        }
        else {
            next();
        }
    });

    app.use(function (req, res, next) {
        if(req.url === "/publish") {
            let body = "";
            req
                .on('readable', function () {
                    let content = req.read();
                    if (content != null)
                        body += content;
                    if (body.length > 1e4) {
                        res.statusCode = 413;
                        log.error("big incoming file");
                        res.end("u fucking bitch can't destroy my server")
                    }
                })
                .on('end', function () {
                    try {
                        var newTransformer = JSON.parse(body);
                    } catch (exeption) {
                        res.statusCode = 400;
                        log.error("not falid json-file in input");
                    }
                    if (newTransformer.type === "Autobot") {
                        let newAutobot = new autobot.Autobot(newTransformer.name, newTransformer.home_planet, newTransformer.attack, newTransformer.health);
                        transformers_room.publish(newAutobot);
                    } else if (newTransformer.type === "Decepticon") {
                        let newDecepticon = new decepticon.Decepticon(newTransformer.name, newTransformer.home_planet, newTransformer.attack, newTransformer.health);
                        transformers_room.publish(newDecepticon);
                    } else {
                        log.error("transformer type not supported");
                        transformers_room.publish("not supported type");
                    }
                    res.end('ok');
                });
        }
        else {
            next();
        }
    });
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