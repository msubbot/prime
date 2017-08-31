/**
 * transformers
 * Created by nsubbot on 01.09.17.
 * All rights reserved by Nikita Subbot ©
 */


let path = require('path');
let util = require('util');
let http = require('http');

function HttpError(status, message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, HttpError);

    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error";
}

util.inherits(HttpError, Error);

HttpError.prototype.name = 'HttpError';

exports.HttpError = HttpError;