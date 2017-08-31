/**
 * transformers
 * Created by nsubbot on 25.08.17.
 * All rights reserved by Nikita Subbot ©
 */

module.exports = function (app) {
    app.use('/creation',function (req, res, next) {
        res.render('creation');
    });
};