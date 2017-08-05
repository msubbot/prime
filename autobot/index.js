/**
 * Created by nsubbot on 02.08.17.
 */
var data_base = require('../data_base');
var transformer = require('../transformer');
var util = require('util');
var log = require("../logger")(module);

function Autobot(name, planet, health, attack) {
    this.name = name;
    this.homePlanet = planet;
    this.health = health;
    this.attack  = attack;
}

util.inherits(Autobot, transformer.Transformer);

Autobot.prototype.sayHelloTo = function (person) {
    log(this.name + " say hello to " + person.name);
    return data_base.getPhrase("hello") + " " + person.name + " from " + person.homePlanet;
}

Autobot.prototype.sayBayTo = function (person) {
    log(this.name + " say bye to " + person.name);
    return data_base.getPhrase("bye") + " " + person.name + " from " + person.homePlanet;
}

exports.Autobot = Autobot;