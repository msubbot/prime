/**
 * transformers
 * Created by nsubbot on 28.08.17.
 * All rights reserved by Nikita Subbot ©
 */

let mongoose = require(".././libs/mongoose");
let localization = require("../custom_modules/localization");

Schema = mongoose.Schema;

let schema = new Schema({
    owner: {
        type: String,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true,
        default: "unknown transformer"
    },
    type: {
        type: String,
        required: true,
        enum: ["Autobot", "Decepticon"],
        default: "Autobot"
    },
    homePlanet: {
        type: String,
        default: "Cibertrone"
    },
    health: {
        type: Number,
        required: true,
        default: 100,
        min: 100,
        max: 1000,
    },
    attack: {
        type: Number,
        required: true,
        default: 10,
        min: 1,
        max: 100
    }
});

schema.methods.sayHelloTo = function (person) {
    return localization.getPhrase("hello") + " " + person.name + " from " + person.homePlanet;
};

schema.methods.sayBayTo = function (person) {
    return localization.getPhrase("bye") + " " + person.name + " from " + person.homePlanet;
};

schema.methods.destroyTransformer = function (autobot) {
    return this.name + localization.getPhrase("destroy") + autobot.name;
};

exports.Transformer = mongoose.model("Transformer", schema);