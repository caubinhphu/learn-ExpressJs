const express = require('express');
const userRoute = require('./route/users.route');


const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.set('views', './views');
app.set('view engine', 'pug');

app.get('', function (request, response) {
	response.render('index', {
		name: 'Hai'
	});
});

app.use('/users', userRoute);

app.listen(port, () => console.log('Server is turned on'));