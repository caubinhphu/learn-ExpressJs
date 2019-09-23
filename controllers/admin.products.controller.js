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
		db.get('products').unshift(product).write();
		response.redirect('/admin/products');
	},
	get: function(request, response) {
		var id = request.params.id;
		var product = db.get('products').find( { id: id } ).value();
		response.render('admin/products/view', {
			active: 'products',
			product: product
		})
	},
	search: function(request, response) {
		var query = request.query.q;
		var matchProducts = db.get('products')
							  .value()
							  .filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
		response.render('admin/products/index', {
			products: matchProducts,
			active: 'products',
			query: query
		})
	}
}