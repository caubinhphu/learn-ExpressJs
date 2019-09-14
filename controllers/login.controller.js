var db = require('../db');


module.exports = {
	login: function(request, response, next) {
		response.render('login/index');
	},
	postLogin: function(request, response, next) {
		var email = request.body.email;
		var password = request.body.password;

		var user = db.get('users').find( { email: email } ).value();

		if (!user || password !== user.password) {
			response.render('login/index', {
				errs: [ 'Email hoặc mật khẩu không đúng' ],
				value: request.body
			});
			return;
		}

		response.cookie('userId', user.id);
		response.redirect('/users');
	}
}