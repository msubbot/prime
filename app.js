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
let cookieParser = require('cookie-parser');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let mongoose = require('libs/mongoose');
let mongoose_store = new MongoStore({mongooseConnection: mongoose.connection});


// Custom modules
let config = require('config');
let log = require('./libs/log')(module);

//  Express models
let Transformer = require("./models/transformer").Transformer;

// Domain module
let serverDomain = require('domain').create();

//Express connection
let app = express();

app.set('port', config.get('port'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

if(app.get('env') === 'development') {
    app.use(logger('dev'));
} else {
    app.use(logger('default'));
}

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

app.use(session ({
    secret: config.get("session:secret"),
    key: config.get("session:key"),
    cookie: config.get("session:cookie"),
    store: mongoose_store
}));

app.use(require('./middleware/loadUser'));

require("routes")(app);

serverDomain.run(function () {

    http.createServer(app).listen(app.get('port'), function () {
        log.info("Express server listening on port " + app.get('port'));
    });

});

serverDomain.on('error', function (err) {
    log.error("Domain catch error: %s", err);
});