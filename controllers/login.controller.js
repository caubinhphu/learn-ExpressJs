const md5 = require('md5');

var db = require('../db');


module.exports = {
	login: function(request, response, next) {
		response.render('login/index');
	},
	postLogin: function(request, response, next) {
		var email = request.body.email;
		var password = request.body.password;
		var passwordEncode = md5(password);

		var user = db.get('users').find( { email: email } ).value();

		if (!user || passwordEncode !== user.password) {
			response.render('login/index', {
				errs: [ 'Email hoặc mật khẩu không đúng' ],
				value: request.body
			});
			return;
		}

		response.cookie('userId', user.id, { signed: true });
		response.redirect('/users');
	},
	logout: function(request, response) {
		response.clearCookie('userId', { signed: true });
		request.app.locals.userLogin = undefined;
		response.redirect('/login');
	}
}