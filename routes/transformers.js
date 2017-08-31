/**
 * transformers
 * Created by nsubbot on 25.08.17.
 * All rights reserved by Nikita Subbot ©
 */

let Transformer = require('../models/transformer').Transformer;


module.exports = function (app) {
    app.use("/transformers", function (req, res, next) {
        let transformersDB = {};
        Transformer.find({}, function (err, transformers) {
            if (err) return next(err);
            transformersDB.data = transformers;
            transformersDB.message = "shit";
            res.render('transformers', transformersDB);
        });
    });
};