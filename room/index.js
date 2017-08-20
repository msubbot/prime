/**
 * transformers
 * Created by nsubbot on 20.08.17.
 * All rights reserved by Nikita Subbot ©
 */
var util = require('util');
var clients = [];

exports.subscribe = function (req, res) {
    console.log('subscribe');
    clients.push(res);
};

exports.publish = function (transformer) {
    console.log("publish '%s'", transformer);

    clients.forEach(function (res) {
        res.end(util.inspect(transformer));
    });

    clients = [];
};

