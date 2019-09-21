require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');

const userRoute = require('./route/user.route');
const loginRoute = require('./route/login.route');
const productRoute = require('./route/products.route');
const adminRoute = require('./route/admin.route');

const middlewareLogin = require('./middleware/login.middleware');

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRECT));


app.set('views', './views');
app.set('view engine', 'pug');

app.get('', function (request, response) {
	response.render('index', {
		name: 'Hai',
		active: 'home',
		user: middlewareLogin.postLogin(request)
	});
});

app.use('/login', loginRoute);
// app.use('/users', middlewareLogin.postLogin, userRoute);
app.use('/user', userRoute);
app.use('/products', productRoute);
app.use('/admin', middlewareLogin.postAdmin, adminRoute);

app.use(express.static('public'));

app.listen(port, () => console.log('Server is turned on'));