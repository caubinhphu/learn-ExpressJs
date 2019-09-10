const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'pug');

var users =  [
			{ name: 'Teo', age: 18 },
			{ name: 'Ty', age: 19 },
			{ name: 'Tet', age: 20 },
			{ name: 'Tyn', age: 20 },
		];



app.get('', function (request, response) {
	response.render('index', {
		name: 'Hai'
	});
});

app.get('/users', function(request, response) {
	response.render('users/index', {
		users: users,
		query: request.query.q
	});
});

app.get('/users/search', function(request, response) {
	var q = request.query.q;
	var matchUsers = users.filter(function(user) {
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
	users.push(request.body);
	// console.log(typeof request.body.age);
	response.redirect('/users');
});

app.listen(port, () => console.log('Server is turned on'));