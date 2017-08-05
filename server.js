/**
 * Created by nsubbot on 02.08.17.
 */

"use strict";
//Connect to data base
var data_base = require("./data_base");
data_base.connect();

var autobot = require('./autobot');                 //Autobots class
var decepticon = require('./decepticon');           //Decepticon class
var http = require('http');                         //Http server
var log = require('winston');                     //Logger module
var util = require('util');                         //Util module
var EventEmitter = require('events').EventEmitter;  //EventEmitter module
var url = require('url');                           //Url parser module
var fs = require('fs');

var server = new http.Server();     //EventEmitter
server.listen(1707, "localhost");

var counter = 0;

server.on('request', function (req, res) {


    //console.log(req.method, req.url);
    var urlParsed = url.parse(req.url, true);
    //console.log(urlParsed);


    //Transformers objects
    if(urlParsed.pathname == "/transformers" && urlParsed.query.autobot && urlParsed.query.decepticon){
        var optimus = new autobot.Autobot(urlParsed.query.autobot, "Cibertrone", 5, 100);
        var bumblebee = new autobot.Autobot("Bumblebee", "Earth", 5, 100);
        var megatrone = new decepticon.Decepticon(urlParsed.query.decepticon, "Cibertrone", 5, 100);
        //debugger;
        log.info("transformers created");

        //inspect objects
        console.log(util.inspect(optimus));
        console.log(util.inspect(megatrone));
        console.log(util.inspect(bumblebee));
        //debugger;

        res.setHeader('Cache-control', 'no-cache');
        fs.readFile('index.html', function (err, info) {
            if(err) {
                log.error('index.html not found');
            }
            else
                res.end(bumblebee.kill(optimus) + " " + ++counter + " times \n" +
                    + info + "\n"
                    + megatrone.destroyAutobot(optimus) +" " + ++counter + " times " +
                    data_base.getPhrase("bye") + " " + optimus.name);
        });
        //debugger;
    }
    else {
        if(urlParsed.pathname == "/transformers" && (urlParsed.query.autobot || urlParsed.query.decepticon)) {
            if(urlParsed.query.autobot){
                var autobotChar = new autobot.Autobot(urlParsed.query.autobot, 'Cibertrone', 5, 100)
                res.end('You need one more transformer to start battle!\n' +
                    'One battle platform only ' + autobotChar.name + "." + '\n' +
                    'And he is AUTOBOT!');
                //debugger;
            } else {
                var decepticonChar = new decepticon.Decepticon(urlParsed.query.decepticon, 'Cibertrone', 5, 100);
                res.end('You need one more transformer to start battle!\n' +
                    'One battle platform only ' + decepticonChar.name + "." + "\n" +
                    "And he is DECEPTICON!");
                //debugger;
            }
        } else {
            log.error('trans not found');
            res.statusCode = 404;
            res.end("No transformers war here!");
        }
    }
});

