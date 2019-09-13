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

		request.body.id = shortid.generate();
		db.get('users').push(request.body).write();
		response.redirect('/users');
	},
	get: function(request, response) {
		var id = request.params.id;
		response.render('users/view', {
			user: db.get('users').find({ id: id }).value(),
			active: 'users'
		});
	}
}