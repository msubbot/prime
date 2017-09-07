/**
 * transformers
 * Created by nsubbot on 03.09.17.
 * All rights reserved by Nikita Subbot ©
 */


module.exports = function (app) {
    app.use('/chat',function (req, res, next) {
        res.render('chat', {
            name: 'battle optimus'
        });
    });
}