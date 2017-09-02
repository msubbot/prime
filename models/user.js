/**
 * transformers
 * Created by nsubbot on 31.08.17.
 * All rights reserved by Nikita Subbot ©
 */

let crypto = require('crypto');
let async = require('async');
let HttpError = require('../error').HttpError;

let mongoose = require("mongoose");
Schema = mongoose.Schema;

let schema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    hashedPassword: {
        type: String,
        require: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

schema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });

schema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function (username, password, callback) {
    let User = this;
    async.waterfall([
            function (callback) {
                User.findOne({username: username}, callback);
            },
            function (user, callback) {
                if (user) {
                    if(user.checkPassword(password)) {
                        callback(null, user);
                    } else {
                        callback( new AuthError("Authorization error."))
                    }
                } else {
                    let user = new User({username: username, password: password});
                    user.save(function (err) {
                        if(err) return callback();
                        callback(null, user);
                    });
                }
            },
        ], callback);
};

exports.User = mongoose.model('User', schema);

let util = require('util');
let http = require('http');

function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, HttpError);

    this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;