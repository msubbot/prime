/**
 * transformers
 * Created by nsubbot on 28.08.17.
 * All rights reserved by Nikita Subbot ©
 */

let Transformer = require("./models/transformer").Transformer;

let trans = new Transformer({
    owner: "Niks",
    name: "Balhed",
    homePlanet: "Cibertrone",
    health: "100",
    attack: "10",
    type: "Autobot"
});

trans.save(function (err, trans, affected) {
    if (err) throw err;

    Transformer.find({owner: "Niks"}, function (err, bot) {
        console.log(bot);
    });
})