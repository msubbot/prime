/**
 * Created by nsubbot on 02.08.17.
 */
let data_base = require('../localization');
let transformer = require('../transformer');
let util = require('util');

function Decepticon(name, planet, health, attack) {
    this.name = name;
    this.homePlanet = planet;
    this.health = health;
    this.attack  = attack;
}

util.inherits(Decepticon, transformer.Transformer);

Decepticon.prototype.sayHelloTo = function (person) {
    return data_base.getPhrase("hello") + " " + person.name + " from " + person.homePlanet;
}

Decepticon.prototype.sayBayTo = function (person) {
    return data_base.getPhrase("bye") + " " + person.name + " from " + person.homePlanet;
}

Decepticon.prototype.destroyAutobot = function (autobot) {
    return this.name + data_base.getPhrase("destroy") + autobot.name;
}

exports.Decepticon = Decepticon;