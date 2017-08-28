/**
 * transformers
 * Created by nsubbot on 20.08.17.
 * All rights reserved by Nikita Subbot ©
 */
let http = require('http');
let express = require('express');
let url = require('url');
let fs = require('fs');
let path = require('path');
let favicon = require('serve-favicon');
let bodyParser = require('body-parser');
let logger = require('morgan');


// Custom modules
let decepticon = require('./custom_modules/decepticon');
let autobot = require('./custom_modules/autobot');
let transformers_room = require('./custom_modules/transformers_room');
let error = require('./custom_modules/errors');
let config = require('config');
let log = require('libs/log')(module);
let localization = require("./custom_modules/localization");
localization.connect();

// Domain module
let domain = require('domain');
let serverDomain = domain.create();

//Root for sending files
let ROOT = __dirname + "/templates";

//Express connection
let app = express();
app.set('port', config.get('port'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

if(app.get('env') === 'development') {
    app.use(logger('dev'));
} else {
    app.use(logger('default'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');


serverDomain.run(function () {

    http.createServer(app).listen(app.get('port'), function () {
        log.info("Express server listening on port " + app.get('port'));
    });

    //TODO fix /menu
    //let index = require('./routes/index');
    //app.use('/', index.route);

    let creation = require('./routes/creation');
    app.use('/creation', creation.route);

    let transformers_room_lobby = require('./routes/transformers_room');
    app.use('/transformers_room', transformers_room_lobby.route);

    let battle = require('./routes/battle');
    app.use('/battle', battle.route);

    app.use(function (req, res, next) {
        if(req.url === "/subscribe") {
            transformers_room.subscribe(req, res);
        }
        else {
            next();
        }
    });

    // app.post("/create", function (req, res) {
    //     let urlParsed = bodyParser.parse(req.url, true);
    //     if(!req.body) res.sendStatus(400)
    //     console.log(req.body);
    // });


    app.use(function (req, res, next) {
        if(req.url === "/publish") {
            let bodyTemp = "";
            req
                .on('readable', function () {
                    let content = req.read();
                    if (content !== null)
                        bodyTemp += content;
                    if (bodyTemp.length > 1e4) {
                        res.statusCode = 413;
                        log.error("big incoming file");
                        res.end("u fucking bitch can't destroy my server")
                    }
                })
                .on('end', function () {
                    try {
                        var newTransformer = JSON.parse(bodyTemp);
                    } catch (exeption) {
                        res.statusCode = 400;
                        log.error("not falid json-file in input");
                    }
                    if (newTransformer.type === "Autobot") {
                        let newAutobot = new autobot.Autobot(newTransformer.owner, newTransformer.name, newTransformer.homePlanet, newTransformer.attack, newTransformer.health);
                        transformers_room.publish(newAutobot);
                    } else if (newTransformer.type === "Decepticon") {
                        let newDecepticon = new decepticon.Decepticon(newTransformer.owner, newTransformer.name, newTransformer.homePlanet, newTransformer.attack, newTransformer.health);
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

serverDomain.on('error', function (err) {
    log.error("Domain catch error: %s", err);
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