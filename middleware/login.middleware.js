const db = require('../db');

module.exports = {
	postLogin: function(request, response, next) {
		if (!request.cookies) {
			response.redirect('/login');
			return;
		}
		var user = db.get('users').find( { id: request.cookies.userId } ).value();
		if (!user) {
			response.redirect('/login');
			return;
		}
		next();
	}
};