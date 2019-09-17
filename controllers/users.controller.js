const shortid = require('shortid');

const db = require('../db');

module.exports = {
	index: function(request, response) {
		response.render('users/index', {
			users: db.get('users').value(),
			query: request.query.q,
			active: 'users'
		});
	},
	search: function(request, response) {
		var q = request.query.q;
		var matchUsers = db.get('users').value().filter(function(user) {
			return user.name.toLowerCase().includes(q.toLowerCase());
		});
		response.render('users/index', {
			users: matchUsers,
			query: request.query.q,
			active: 'users'
		});
	},
	create: function(request, response) {
		response.render('users/create', { active: 'users' });
	},
	postCreate: function(request, response) {
		request.body.id = shortid.generate();
		if (!request.file)
			request.body.avatar = '/image/avatar.png';
		else request.body.avatar = '/uploads/' + request.file.filename;
		db.get('users').push(request.body).write();
		response.redirect('/users');
	},
	get: function(request, response) {
		var id = request.params.id;
		response.render('users/view', {
			userView: db.get('users').find({ id: id }).value(),
			active: 'users'
		});
	}
}