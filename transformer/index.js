/**
 * transformers
 * Created by nsubbot on 02.08.17.
 * All rights reserved by Nikita Subbot ©
 */
var log = require("../logger/logger")(module);

function Transformer(name) {
    this.name = name;
}

Transformer.prototype.kill = function (transformer) {
    log(this.name + " kill " + transformer.name);
    return this.name + " kill " + transformer.name;
}

exports.Transformer = Transformer;