const express = require('express');
const cookieParser = require('cookie-parser');

const userRoute = require('./route/users.route');
const loginRoute = require('./route/login.route');

const middlewareLogin = require('./middleware/login.middleware');

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('asdhgf2q31235asdf'));


app.set('views', './views');
app.set('view engine', 'pug');

app.get('', function (request, response) {
	response.render('index', {
		name: 'Hai',
		active: 'home'
	});
});

app.use('/login', loginRoute); 
app.use('/users', middlewareLogin.postLogin, userRoute);
app.use(express.static('public'));
app.listen(port, () => console.log('Server is turned on'));