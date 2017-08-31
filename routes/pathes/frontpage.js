/**
 * transformers
 * Created by nsubbot on 31.08.17.
 * All rights reserved by Nikita Subbot ©
 */

module.exports = function (app) {
    app.use('/',function (req, res, next) {
        res.render('frontpage');
    });
};