/**
 * transformers
 * Created by nsubbot on 31.08.17.
 * All rights reserved by Nikita Subbot ©
 */

let url = require("url");
let Transformer = require('../../models/transformer').Transformer;

module.exports = function (app) {
    app.get('/create', function (req, res, next) {
        let urlParsed = url.parse(req.url, true);
        let newTransformer = new Transformer({
            owner: urlParsed.query.owner,
            name: urlParsed.query.name,
            type: urlParsed.query.type,
            home_planet: urlParsed.query.home_planet,
            attack: urlParsed.query.attack,
            health: urlParsed.query.health
        });
        newTransformer.save(function (req, newTransformer, affected) {
            console.log(arguments);
        });
        res.json(newTransformer);
    });
};