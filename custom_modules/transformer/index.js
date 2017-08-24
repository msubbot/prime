/**
 * transformers
 * Created by nsubbot on 02.08.17.
 * All rights reserved by Nikita Subbot ©
 */

function Transformer(name) {
    this.name = name;
}

Transformer.prototype.kill = function (transformer) {
    return this.name + " kill " + transformer.name;
};

exports.Transformer = Transformer;