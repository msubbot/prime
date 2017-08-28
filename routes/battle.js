/**
 * transformers
 * Created by nsubbot on 25.08.17.
 * All rights reserved by Nikita Subbot ©
 */


// ejs version
// let express = require('express');
// let router = express.Router();

// router.get('/', function(req, res, next) {
//     res.render('battle', {
//         name: 'Optimus'
//     });
// });
//
// module.exports = router;

exports.route = function (req, res, next) {
    res.render('battle', {
        name: 'Optimus'
    });
};