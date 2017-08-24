/**
 * transformers
 * Created by nsubbot on 20.08.17.
 * All rights reserved by Nikita Subbot ©
 */
let log = require('winston');
let express = require('express');
let config = require('config');

let domain = require('domain');
let serverDomain = domain.create();

let app = express();
app.set('port', config.get('port'));

serverDomain.on('error', function (err) {
    log.error("Domain catch error: %s", err);
});

serverDomain.run(function () {
    var server = require('./server');
    server.listen(config.get('port'));
});