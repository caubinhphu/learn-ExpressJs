const express = require('express');
const app = express();
const port = 3000;
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const shortid = require('shortid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.defaults({users: []}).write();

app.set('views', './views');
app.set('view engine', 'pug');

app.get('', function (request, response) {
	response.render('index', {
		name: 'Hai'
	});
});

app.get('/users', function(request, response) {
	response.render('users/index', {
		users: db.get('users').value(),
		query: request.query.q
	});
});

app.get('/users/search', function(request, response) {
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

app.get('/users/create', function(request, response) {
	response.render('users/create');
});

app.post('/users/create', function(request, response) {
	// users.push(request.body);
	request.body.id = shortid.generate();
	db.get('users').push(request.body).write();
	// console.log(typeof request.body.age);
	response.redirect('/users');
});

app.get('/users/:id', function(request, response) {
	var id = request.params.id;
	response.render('users/view', {
		user: db.get('users').find({ id: id }).value()
	});
});

app.listen(port, () => console.log('Server is turned on'));