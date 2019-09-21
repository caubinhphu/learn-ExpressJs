require('dotenv').config();

const md5 = require('md5');

const db = require('../db');

module.exports = {
	login: function(request, response, next) {
		response.clearCookie('userId', { signed: true });
		response.clearCookie('id', { signed: true });
		response.render('login/index');
	},
	postLogin: function(request, response, next) {
		var email = request.body.email;
		var password = request.body.password;
		var passwordEncode = md5(password);

		if (email === process.env.ADMIN && passwordEncode === process.env.PASS) {
			// request.app.locals.id = process.env.ID;
			response.cookie('id', process.env.ID, { signed: true });
			response.redirect('/admin/products');
			return;
		}
		var user = db.get('users').find( { email: email } ).value();

		if (!user || passwordEncode !== user.password) {
			response.render('login/index', {
				errs: [ 'Email hoặc mật khẩu không đúng' ],
				value: request.body
			});
			return;
		}

		response.cookie('userId', user.id, { signed: true });
		// request.app.locals.userLogin = user;
		response.redirect('/user/cart');
	},
	logout: function(request, response) {
		response.clearCookie('userId', { signed: true });
		request.app.locals.userLogin = undefined;
		response.redirect('/login');
	}
}