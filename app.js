/**
 * transformers
 * Created by nsubbot on 20.08.17.
 * All rights reserved by Nikita Subbot ©
 */
let http = require('http');
let express = require('express');
let url = require('url');
let path = require('path');
let favicon = require('serve-favicon');
let bodyParser = require('body-parser');
let logger = require('morgan');


// Custom modules
let config = require('config');
let log = require('./libs/log')(module);

//  Express models
let Transformer = require("./models/transformer").Transformer;

// Domain module
let serverDomain = require('domain').create();

//Express connection
let app = express();

require("routes")(app);
app.set('port', config.get('port'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

if(app.get('env') === 'development') {
    app.use(logger('dev'));
} else {
    app.use(logger('default'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');


serverDomain.run(function () {

    http.createServer(app).listen(app.get('port'), function () {
        log.info("Express server listening on port " + app.get('port'));
    });

});

serverDomain.on('error', function (err) {
    log.error("Domain catch error: %s", err);
});