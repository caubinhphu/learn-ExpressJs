require('dotenv').config();

const md5 = require('md5');
const shortid = require('shortid');

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
	},
	signUp: function(request, response) {
		response.render('login/signup');
	},
	postSignUp: function(request, response) {
		var user = request.body;
		user.id = shortid.generate();
		if (!request.file)
			user.avatar = '/image/avatar.png';
		else user.avatar = '/uploads/' + request.file.filename;
		user.password = md5(user.password);

		db.get('users').push(user).write();
		response.cookie('userId', user.id, { signed: true });
		response.redirect('/user/cart');
	}
}