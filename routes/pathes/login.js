/**
 * transformers
 * Created by nsubbot on 31.08.17.
 * All rights reserved by Nikita Subbot ©
 */
let User = require('../../models/user').User;
let async = require('async');
let HttpError = require('../../error').HttpError;
let AuthError = require('../../models/user').AuthError;

module.exports = function (app) {
    app.get('/login', function (req, res) {
        res.render('login');
    });

    app.post('/login', function (req, res, next) {
       let username = req.body.username;
       let password = req.body.password;

       User.authorize(username, password, function (err, user) {
           if(err) {
               if (err instanceof AuthError) {
                   return next(new HttpError(403, err.message));
               } else {
                   return next(err);
               }
           }

           req.session.user = user._id;
           res.send({});
       });
    });
};