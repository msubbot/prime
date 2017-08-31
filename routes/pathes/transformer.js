/**
 * transformers
 * Created by nsubbot on 31.08.17.
 * All rights reserved by Nikita Subbot ©
 */
let Transformer = require('../../models/transformer').Transformer;

module.exports = function (app) {
    app.get('/transformer/:id', function (req, res, next) {
        Transformer.findById(req.params.id, function (err, transformer) {
            if (err) return next(err);
            transformer.data = transformer;
            transformer.message = "damnit";
            res.render('transformer', transformer);
        })
    });
}