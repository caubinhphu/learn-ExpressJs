const shortid = require('shortid');
const db = require('../db');

module.exports = {
	index: function(request, response) {
		response.render('users/index', {
			users: db.get('users').value(),
			query: request.query.q
		});
	},
	search: function(request, response) {
		var q = request.query.q;
		var matchUsers = db.get('users').value().filter(function(user) {
			return user.name.toLowerCase().includes(q.toLowerCase());
		});
		response.render('users/index', {
			users: matchUsers,
			query: request.query.q
		});
	},
	create: function(request, response) {
		response.render('users/create');
	},
	postCreate: function(request, response) {
		request.body.id = shortid.generate();
		db.get('users').push(request.body).write();
		response.redirect('/users');
	},
	get: function(request, response) {
		var id = request.params.id;
		response.render('users/view', {
			user: db.get('users').find({ id: id }).value()
		});
	}
}