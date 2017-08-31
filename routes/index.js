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

    //TODO FIX / PRIMARY
    //let frontpage = require('./pathes/frontpage')(app);

    let creation = require('./pathes/creation')(app);

    let transformers = require('./pathes/transformers')(app);

    let transformer = require('./pathes/transformer')(app);

    let battle = require('./pathes/battle')(app);

    let create = require('./pathes/create')(app);

    let login = require('./pathes/login')(app);

};