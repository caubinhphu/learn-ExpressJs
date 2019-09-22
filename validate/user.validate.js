const db = require('../db');

module.exports = {
	postCreate: function(request, response, next) {
		var errors = [];
		if (!request.body.email) {
			errors.push('Chưa nhập email');
		}
		var users = db.get('users').value();
		var trungEmail = users.some(user => user.email === request.body.email);
		if (trungEmail) {
			errors.push('Email không hợp lệ');
		}
		if (!request.body.password) {
			errors.push('Chưa nhập password');
		}
		if (!request.body.repassword || request.body.repassword !== request.body.password) {
			errors.push('Sai re-password');
		}
		if (!request.body.name) {
			errors.push('Chưa nhập tên');
		}
		if (!request.body.age) {
			errors.push('Chưa nhập tuổi');
		}
		
		if (errors.length > 0) {
			response.render('admin/users/create', {
				active: 'users',
				errs: errors,
				values: request.body
			});
			return;
		}

		next();
	},
	postEdit: function(request, response, next) {
		var errors = [];
		if (!request.body.name) {
			errors.push('Chưa nhập tên');
		}
		if (!request.body.age) {
			errors.push('Chưa nhập tuổi');
		}
		
		if (errors.length > 0) {
			response.render('users/edit', {
				active: 'users',
				errs: errors,
				values: request.body,
				userEdit: request.app.locals.userLogin
			});
			return;
		}

		next();
	},
	postSignUp: function(request, response, next) {
		var errors = [];
		if (!request.body.email) {
			errors.push('Chưa nhập email');
		}
		var users = db.get('users').value();
		var trungEmail = users.some(user => user.email === request.body.email);
		if (trungEmail) {
			errors.push('Email không hợp lệ');
		}
		if (!request.body.password) {
			errors.push('Chưa nhập password');
		}
		if (!request.body.repassword || request.body.repassword !== request.body.password) {
			errors.push('Sai re-password');
		}
		if (!request.body.name) {
			errors.push('Chưa nhập tên');
		}
		if (!request.body.age) {
			errors.push('Chưa nhập tuổi');
		}
		
		if (errors.length > 0) {
			response.render('login/signup', {
				errs: errors,
				values: request.body
			});
			return;
		}

		next();
	}
};