/**
 * transformers
 * Created by nsubbot on 20.08.17.
 * All rights reserved by Nikita Subbot ©
 */
let util = require('util');
let clients = [];

exports.subscribe = function (req, res) {
    console.log('subscribe');
    clients.push(res);

    res.on('close', function () {
        clients.splice(clients.indexOf(res), 1);
    })
};

exports.publish = function (transformer) {
    console.log("publish '%s'", transformer);

    clients.forEach(function (res) {
        res.end(util.inspect(transformer));
    });

    clients = [];
};

