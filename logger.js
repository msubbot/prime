/**
 * transformers
 * Created by nsubbot on 02.08.17.
 * All rights reserved by Nikita Subbot ©
 */

module.exports = function (module) {
    return function (/* */) {
        var args = [module.filename].concat([].slice.call(arguments));
        console.log.apply(console, args);
    }
}
