const shortid = require('shortid');

const db = require('../db');

module.exports = {
	index: function(request, response) {
		response.render('admin/products/index', {
			products: db.get('products').value(),
			active: 'products'
		});
	},
	create: function(request, response) {
		response.render('admin/products/create', {
			active: 'products'
		});
	},
	postProduct: function(request, response) {
		var product = request.body;
		product.id = shortid.generate();
		product.images = request.files.map(image => `/uploads/${image.filename}`);
		db.get('products').push(product).write();
		response.redirect('/admin/products');
	}
}