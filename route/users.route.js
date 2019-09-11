const express = require('express');
const shortid = require('shortid');

const db = require('../db');

const router = express.Router();

router.get('/', function(request, response) {
	response.render('users/index', {
		users: db.get('users').value(),
		query: request.query.q
	});
});

router.get('/search', function(request, response) {
	var q = request.query.q;
	var matchUsers = db.get('users').value().filter(function(user) {
		// return user.name.localeCompare(q, 'en', { sensitivity: 'base' });
		return user.name.toLowerCase().includes(q.toLowerCase());
	});
	// console.log(matchUsers);
	response.render('users/index', {
		users: matchUsers,
		query: request.query.q
	});
});

router.get('/create', function(request, response) {
	response.render('users/create');
});

router.post('/create', function(request, response) {
	// users.push(request.body);
	request.body.id = shortid.generate();
	db.get('users').push(request.body).write();
	// console.log(typeof request.body.age);
	response.redirect('/users');
});

router.get('/:id', function(request, response) {
	var id = request.params.id;
	response.render('users/view', {
		user: db.get('users').find({ id: id }).value()
	});
});


module.exports = router;