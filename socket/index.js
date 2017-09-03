/**
 * transformers
 * Created by nsubbot on 03.09.17.
 * All rights reserved by Nikita Subbot ©
 */
let log = require('../libs/log')(module);

module.exports = function (server) {
  let io = require('socket.io').listen(server);
  io.set('origins', 'localhost:*');
  io.set('logger', log);

  io.sockets.on('connection', function (socket) {

    socket.on('message', function (text, callback) {
      socket.broadcast.emit('message', text);
      callback("back");
      // Send data back to client
    });
  });
}