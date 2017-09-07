/**
 * transformers
 * Created by nsubbot on 04.09.17.
 * All rights reserved by Nikita Subbot ©
 */


let express = require('express');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let mongoose = require('./mongoose');

let sessionStore = new MongoStore({mongooseConnection: mongoose.connection});

module.exports = sessionStore;

