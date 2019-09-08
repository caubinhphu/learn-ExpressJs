const express = require('express');
const app = express();
const port = 3000;

// app.get('/', (request, response) => response.send('Hello ExpressJs'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('', function (request, response) {
	response.render('index', {
		name: 'Hai'
	});
});

app.get('/users', function(request, response) {
	response.render('uesrs/index', {
		users: [
			{ name: 'Teo', age: 18 },
			{ name: 'Ty', age: 19 }
		]
	});
});

app.listen(port, () => console.log('Server is turned on'));