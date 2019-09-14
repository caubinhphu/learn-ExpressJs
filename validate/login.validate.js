module.exports = {
	postLogin: function(request, response, next) {
		var errors = [];
		if (!request.body.email) {
			errors.push('Chưa nhập email');
		}
		if (!request.body.password) {
			errors.push('Chưa nhập password');
		}

		if (errors.length > 0) {
			response.render('login/index', {
				errs: errors,
				value: request.body
			});
			return;
		}
		next();
	}
};