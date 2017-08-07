/**
 * transformers
 * Created by nsubbot on 07.08.17.
 * All rights reserved by Nikita Subbot ©
 */

var url=require('url');
var log = require('winston');

var autobot = require("../../../autobot");
var decepticon = require("../../../decepticon");

var urlParsed = url.parse(req.url, true);
var optimus = new autobot.Autobot(urlParsed.query.autobot, "Cibertrone", 5, 100);
var megatrone = new decepticon.Decepticon(urlParsed.query.decepticon, "Cibertrone", 5, 100);
log.info("transformers created");

var div = document.createElement('div');
div.className = 'battle';
div.innerHTML = optimus.name.toUpperCase() + " vs " + megatrone.name.toUpperCase();
document.body.appendChild(div);