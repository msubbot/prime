/**
 * transformers
 * Created by nsubbot on 01.09.17.
 * All rights reserved by Nikita Subbot ©
 */


module.exports = function (app) {
    app.post('/logout', function (req, res, next) {
        req.session.destroy();
        res.redirect('/');
    });
};