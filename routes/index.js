/**
 * transformers
 * Created by nsubbot on 25.08.17.
 * All rights reserved by Nikita Subbot ©
 */

/**
 * transformers
 * Created by nsubbot on 25.08.17.
 * All rights reserved by Nikita Subbot ©
 */

module.exports = function (app) {

    let creation = require('./creation')(app);

    let transformers = require('./transformers')(app);

    let battle = require('./battle')(app);

    let create = require('./create')(app);

    let transformer = require('./transformer')(app);

};