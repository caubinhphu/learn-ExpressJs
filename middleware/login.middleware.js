const db = require('../db');

module.exports = {
	postLogin1: function(request, response, next) {
		if (!request.signedCookies) {
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
	}
};