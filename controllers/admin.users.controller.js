const shortid = require('shortid');
const md5 = require('md5');

const db = require('../db');

module.exports = {
	index: function(request, response) {
		response.render('admin/users/index', {
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
		response.render('admin/users/index', {
			users: matchUsers,
			query: request.query.q,
			active: 'users'
		});
	},
	create: function(request, response) {
		response.render('admin/users/create', { active: 'users' });
	},
	postCreate: function(request, response) {
		var user = request.body;
		user.id = shortid.generate();
		if (!request.file)
			user.avatar = '/image/avatar.png';
		else user.avatar = '/uploads/' + request.file.filename;
		user.password = md5(user.password);

		db.get('users').push(user).write();
		response.redirect('/admin/users');
	},
	get: function(request, response) {
		var id = request.params.id;
		response.render('admin/users/view', {
			userView: db.get('users').find({ id: id }).value(),
			active: 'users'
		});
	}
}