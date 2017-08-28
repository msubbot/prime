/**
 * Created by nsubbot on 02.08.17.
 */
let localization = require('../localization');
let transformer = require('../transformer');
let util = require('util');

function Autobot(owner, name, planet, health, attack) {
    this.owner = owner;
    this.name = name;
    this.homePlanet = planet;
    this.health = health;
    this.attack  = attack;
}

util.inherits(Autobot, transformer.Transformer);

Autobot.prototype.sayHelloTo = function (person) {
    return localization.getPhrase("hello") + " " + person.name + " from " + person.homePlanet;
};

Autobot.prototype.sayBayTo = function (person) {
    return localization.getPhrase("bye") + " " + person.name + " from " + person.homePlanet;
};

Autobot.prototype.destroyTransformer = function (transformer) {
    return this.name + localization.getPhrase("destroy") + transformer.name;
};

exports.Autobot = Autobot;