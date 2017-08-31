/**
 * transformers
 * Created by nsubbot on 31.08.17.
 * All rights reserved by Nikita Subbot ©
 */
let User = require('../../models/user').User;
let async = require('async');
let HttpError = require('../../error');

module.exports = function (app) {
    app.get('/login', function (req, res) {
        res.render('login');
    });

    app.post('/login', function (req, res, next) {
       let username = req.body.username;
       let password = req.body.password;

        async.waterfall([
            function (callback) {
                User.findOne({username: username}, callback);
            },
            function (user, callback) {
                if (user) {
                    if(user.checkPassword(password)) {
                        callback(null, user);
                    } else {
                        next( new HttpError(403, "Incorrect password."))
                    }
                } else {
                    let user = new User({username: username, password: password});
                    user.save(function (err) {
                        if(err) return next();
                        callback(null, user);
                    });
                }
            },
            ], function (err, user) {
                if(err) return next(err);
                req.session.user = user._id;
                res.send({});
            }
        );
    });
};