var util = require("util");

function LocalizationError(status, message) {
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this, LocalizationError);
}

util.inherits(LocalizationError, Error);
LocalizationError.prototype.name = "LocalizationError";

exports.LocalizationError = LocalizationError;