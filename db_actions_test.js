/**
 * transformers
 * Created by nsubbot on 28.08.17.
 * All rights reserved by Nikita Subbot ©
 */
let mongoose = require("./libs/mongoose");
mongoose.set("debug", true);
let async = require("async");


async.series([
    openConnection,
    dropDatabase,
    requireModels,
    createTransformers
], function (err) {
    console.log(arguments);
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
});

function openConnection(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    let db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('./models/transformer');

    async.each(Object.keys(mongoose.models), function (modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createTransformers(callback) {
    let transformers = [
        {   owner: "Niks", name: "Prime", homePlanet: "Cibertrone", health: "200", attack: "10", type: "Autobot"   },
        {   owner: "Niks", name: "Megatrone", homePlanet: "Cibertrone", health: "120", attack: "10", type: "Decepticon"   },
        {   owner: "Niks", name: "JZ", homePlanet: "Cibertrone", health: "100", attack: "10", type: "Autobot"   },
    ];

    async.each(transformers, function (transformersData, callback) {
        let trans = new mongoose.models.Transformer(transformersData);
        trans.save(callback);
    }, callback);
}