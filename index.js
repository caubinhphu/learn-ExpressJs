const express = require('express');
const app = express();
const port = 3000;

// app.get('/', (request, response) => response.send('Hello ExpressJs'));

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
		return user.name.toLowerCase().includes(q.toLowerCase());
	});
	// console.log(matchUsers);
	response.render('users/index', {
		users: matchUsers,
		query: request.query.q
	});
});

app.listen(port, () => console.log('Server is turned on'));