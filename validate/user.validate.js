module.exports = {
	postCreate: function(request, response, next) {
		var errors = [];
		if (!request.body.name) {
			errors.push('Chưa nhập tên');
		}
		if (!request.body.age) {
			errors.push('Chưa nhập tuổi');
		}
		
		if (errors.length > 0) {
			response.render('users/create', {
				active: 'users',
				errs: errors,
				values: request.body
			});
			return;
		}

		next();
	}
};