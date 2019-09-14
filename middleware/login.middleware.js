const db = require('../db');

module.exports = {
	postLogin: function(request, response, next) {
		console.log(request.signedCookies);
		if (!request.signedCookies) {
			response.redirect('/login');
			return;
		}
		var user = db.get('users').find( { id: request.signedCookies.userId } ).value();
		if (!user) {
			response.redirect('/login');
			return;
		}

		response.locals.user = user;
		next();
	}
};