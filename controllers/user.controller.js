const db = require('../db');
const middlewareLogin = require('../middleware/login.middleware');

module.exports = {
	cart: function(request, response) {
		response.render('user/cart', {
			active: 'cart',
			user: middlewareLogin.postLogin(request)
		});
	},
	edit: function(request, response) {
		response.render('user/edit', {
			active: 'cart',
			// user: request.app.locals.userLogin
			user: middlewareLogin.postLogin(request)
		});
	},
	postEdit: function(request, response) {
		// var id = request.params.id;
		var id = middlewareLogin.postLogin(request).id;
		var user = db.get('users').find( { id: id }).value();
		user.name = request.body.name;
		user.age = request.body.age;
		if (request.file)
			user.avatar = '/uploads/' + request.file.filename;
		db.get('users').write();
		response.redirect('/user/cart');
	}
}