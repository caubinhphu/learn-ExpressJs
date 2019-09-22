require('dotenv').config();

const md5 = require('md5');

const db = require('../db');

module.exports = {
	postLogin1: function(request, response, next) {
		if (!request.signedCookies.userId) {
			response.redirect('/login');
			return;
		}
		var user = db.get('users').find( { id: request.signedCookies.userId } ).value();
		if (!user) {
			response.redirect('/login');
			return;
		}

		request.app.locals.userLogin = user;
		next();
	},
	
	postLogin: function(request) {
		if (!request.signedCookies.userId) {
			return undefined;
		}
		var user = db.get('users').find( { id: request.signedCookies.userId} ).value();
		if (!user) {
			return undefined;
		}
		return user;
	},

	postAdmin: function(request, response, next) {
		if (!request.signedCookies.id) {
			response.redirect('/login');
			return;
		}
		if (request.signedCookies.id !== process.env.ID) {
			nresponse.redirect('/login');
			return;
		}
		next();
	}
};