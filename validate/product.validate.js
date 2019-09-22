module.exports = {
	postProduct: function(request, response, next) {
		var errors = [];
		if (!request.body.name) {
			errors.push('Chưa nhập tên sản phẩm');
		}
		if (request.files.length === 0) {
			errors.push('Chưa choạn ảnh');
		}

		if (errors.length > 0) {
			response.render('admin/products/create', {
				active: 'products',
				values: request.body,
				errs: errors
			})
			return;
		}

		next();
	}
}