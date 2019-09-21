const db = require('../db');

module.exports = {
	index: function(request, response) {
		response.render('admin/products/index', {
			products: db.get('products').value(),
			active: 'products'
		});
	}
}