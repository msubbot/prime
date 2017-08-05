/**
 * transformers
 * Created by nsubbot on 02.08.17.
 * All rights reserved by Nikita Subbot ©
 */
var error = require("../errors");

var localization;
exports.connect =  function () {
    localization = require('./transformer_localization_ru.json')
};

exports.getPhrase = function (name) {
    if (!localization[name]) {
        throw new error.LocalizationError(500, "No such phrase in localization - " + name);
    }
    return localization[name];
}
