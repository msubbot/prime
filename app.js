/**
 * transformers
 * Created by nsubbot on 20.08.17.
 * All rights reserved by Nikita Subbot ©
 */
let log = require('winston');

let domain = require('domain');
let serverDomain = domain.create();

serverDomain.on('error', function (err) {
    log.error("Domain catch error: %s", err);
});

serverDomain.run(function () {
    var server = require('./server');
    server.listen(1707);
});