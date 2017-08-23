let util = require("util");

function LocalizationError(status, message) {
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this, LocalizationError);
}

util.inherits(LocalizationError, Error);
LocalizationError.prototype.name = "LocalizationError";

exports.LocalizationError = LocalizationError;

function NotSaveSandingFile(status, message) {
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this, NotSaveSandingFile);
}

util.inherits(NotSaveSandingFile, Error);
NotSaveSandingFile.prototype.name = "NotSaveSandingFile";

exports.NotSaveSandingFile = NotSaveSandingFile;