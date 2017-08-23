/**
 * Created by nsubbot on 02.08.17.
 */
let data_base = require('../data_base');
let transformer = require('../transformer');
let util = require('util');
let log = require("../logger/logger")(module);

function Decepticon(name, planet, health, attack) {
    this.name = name;
    this.homePlanet = planet;
    this.health = health;
    this.attack  = attack;
}

util.inherits(Decepticon, transformer.Transformer);

Decepticon.prototype.sayHelloTo = function (person) {
    log(this.name + " say hello to " + person.name);
    return data_base.getPhrase("hello") + " " + person.name + " from " + person.homePlanet;
}

Decepticon.prototype.sayBayTo = function (person) {
    log(this.name + " say bye to " + person.name);
    return data_base.getPhrase("bye") + " " + person.name + " from " + person.homePlanet;
}

Decepticon.prototype.destroyAutobot = function (autobot) {
    log(this.name + " destroy " + autobot.name);
    return this.name + data_base.getPhrase("destroy") + autobot.name;
}

exports.Decepticon = Decepticon;