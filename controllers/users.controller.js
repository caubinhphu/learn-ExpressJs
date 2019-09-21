const shortid = require('shortid');

const db = require('../db');
const middlewareLogin = require('../middleware/login.middleware');

module.exports = {
	// index: function(request, response) {
	// 	response.render('users/index', {
	// 		users: db.get('users').value(),
	// 		query: request.query.q,
	// 		active: 'users'
	// 	});
	// },
	// search: function(request, response) {
	// 	var q = request.query.q;
	// 	var matchUsers = db.get('users').value().filter(function(user) {
	// 		return user.name.toLowerCase().includes(q.toLowerCase());
	// 	});
	// 	response.render('users/index', {
	// 		users: matchUsers,
	// 		query: request.query.q,
	// 		active: 'users'
	// 	});
	// },
	// create: function(request, response) {
	// 	response.render('users/create', { active: 'users' });
	// },
	// postCreate: function(request, response) {
	// 	request.body.id = shortid.generate();
	// 	if (!request.file)
	// 		request.body.avatar = '/image/avatar.png';
	// 	else request.body.avatar = '/uploads/' + request.file.filename;
	// 	db.get('users').push(request.body).write();
	// 	response.redirect('/users');
	// },
	// get: function(request, response) {
	// 	var id = request.params.id;
	// 	response.render('users/view', {
	// 		userView: db.get('users').find({ id: id }).value(),
	// 		active: 'users'
	// 	});
	// },
	// edit: function(request, response) {
	// 	var id = request.params.id;
	// 	response.render('users/edit', {
	// 		userEdit: request.app.locals.userLogin
	// 	});
	// },
	// postEdit: function(request, response) {
	// 	var id = request.params.id;
	// 	var user = db.get('users').find( { id: id }).value();
	// 	user.name = request.body.name;
	// 	user.age = request.body.age;
	// 	if (request.file)
	// 		user.avatar = '/uploads/' + request.file.filename;
	// 	db.get('users').write();
	// 	response.redirect('/users/' + id);
	// }
	//
	cart: function(request, response) {
		console.log(middlewareLogin.postLogin(request));
		response.render('user/cart', {
			active: 'cart',
			user: middlewareLogin.postLogin(request)
		});
	},
	edit: function(request, response) {
		response.render('user/edit', {
			// user: request.app.locals.userLogin
			user: middlewareLogin.postLogin(request)
		});
	},
	postEdit: function(request, response) {
		var id = request.params.id;
		var user = db.get('users').find( { id: id }).value();
		user.name = request.body.name;
		user.age = request.body.age;
		if (request.file)
			user.avatar = '/uploads/' + request.file.filename;
		db.get('users').write();
		response.redirect('/users/' + id);
	}
}