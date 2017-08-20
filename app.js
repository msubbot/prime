/**
 * transformers
 * Created by nsubbot on 20.08.17.
 * All rights reserved by Nikita Subbot ©
 */
var server = require('./server');
var log = require('winston')

var domain = require('domain');
var serverDomain = domain.create();

serverDomain.on('error', function (err) {
    log.error("Domain catch error: %s", err);
});

serverDomain.run(function () {
    server.listen(1707);
})