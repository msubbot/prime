/**
 * transformers
 * Created by nsubbot on 24.08.17.
 * All rights reserved by Nikita Subbot ©
 */

let winston = require('winston');
const ENV = process.env.NODE_ENV;

function getLogger(module) {

    var path = module.filename.split('/').slice(-2).join('/');

    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: ENV === 'development' ? 'debug' : 'error',
                label: path
            })
        ]
    });
}

module.exports = getLogger;