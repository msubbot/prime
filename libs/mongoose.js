/**
 * transformers
 * Created by nsubbot on 28.08.17.
 * All rights reserved by Nikita Subbot ©
 */

let mongoose = require("mongoose");
let config = require("config");
let bluebird = require("bluebird");

mongoose.Promise = bluebird;

mongoose.connect(config.get("mongoose:uri"), config.get("mongoose:options"));

module.exports = mongoose;