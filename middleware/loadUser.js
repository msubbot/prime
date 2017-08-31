/**
 * transformers
 * Created by nsubbot on 01.09.17.
 * All rights reserved by Nikita Subbot ©
 */

let User = require('../models/user').User;

module.exports = function (req, res, next) {

    req.user = res.locals.user = null;

    if(!req.session.user) return next();

    User.findById(req.session.user, function (err, user) {
        if (err) return next(err);

        req.user = res.locals.user = user;
        next();
    })
};