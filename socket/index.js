/**
 * transformers
 * Created by nsubbot on 03.09.17.
 * All rights reserved by Nikita Subbot ©
 */
let log = require('../libs/log')(module);
let config = require('config');
let connect = require('connect');
let async = require('async');
let cookie = require('cookie');
let sessionStore = require('../libs/sessionStore');
let HttpError = require('../error').HttpError;
let User = require('../models/user').User;
let cookieParser = require('cookie-parser');
let util = require('util');

function loadSession (sid, callback) {
		sessionStore.load(sid, function (err, session) {
				if(arguments.length === 0) {
						return callback(null, null);
				} else {
						return callback(null, session);
				}
		})
}

function loadUser (session, callback) {
		if (!session.user) {
				log.debug('Session %s is anonymous', session.id);
				return callback(null, null);
		}

		log.debug('retrieving user ', session.user);

		User.findById(session.user, function (err, user) {
				if(err) return callback(err);

				if(!user) {
						return callback(null, null);
				}
				log.debug('user finded by id: ' + user);
				callback(null, user);
		})
}

module.exports = function (server) {
  let io = require('socket.io').listen(server);
  io.set('origins', 'localhost:*');
  io.set('logger', log);

  io.set('authorization', function (handshake, callback) {
			async.waterfall([
				function (callback) {
						handshake.cookies = cookie.parse(handshake.headers.cookie || '');
						let sidCookie = handshake.cookies[config.get('session:key')];
						let sid = cookieParser.signedCookie(sidCookie, config.get('session:secret'));

						loadSession(sid, callback);
				},
				function (session, callback) {

						if (!session) {
								callback(new HttpError(401, 'No session'));
						}

						handshake.session = session;
						loadUser(session, callback);
				},
				function (user, callback) {
						if(!user) {
								callback(new HttpError(403, 'Anon session may not connect.'));
						}

						handshake.user = user;
						debugger;
						callback(null);
				}
			], function (err) {
					if(!err) {
							return callback(null, true);
					}

					if(err instanceof HttpError) {
							return callback(null, false);
					}

					callback(err);
			});
	});

  io.sockets.on('connection', (socket) => {

  		let usernameFIX = "someone";

  		let username = usernameFIX;

			//let bug = socket.handshake.user.get('username');

  		socket.broadcast.emit('join', username);

  		socket.on('message', function (text, callback) {
					socket.broadcast.emit('message', username, text);
					callback("back");
					// Send data back to client
			});

  		socket.on('disconnect', function () {
					socket.broadcast.emit('leave', username);
			});
  });

  return io;
}