/**
 * transformers
 * Created by nsubbot on 25.08.17.
 * All rights reserved by Nikita Subbot ©
 */

exports.route = function (req, res, next) {
    res.render('creation', {
        name: 'Optimus'
    });
};