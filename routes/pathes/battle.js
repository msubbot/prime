/**
 * transformers
 * Created by nsubbot on 25.08.17.
 * All rights reserved by Nikita Subbot ©
 */

module.exports = function (app) {
    app.use('/battle',function (req, res, next) {
        res.render('battle', {
            name: 'battle optimus'
        });
    });
};