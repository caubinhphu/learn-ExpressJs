const express = require('express');
const multer = require('multer');

const router = express.Router();

const productsController = require('../controllers/admin.products.controller');
const usersController = require('../controllers/admin.users.controller');
const validate = require('../validate/user.validate');

const upload = multer({ dest: './public/uploads' });

router.get('/products', productsController.index);

router.get('/users', usersController.index);

router.get('/users/search', usersController.search);

router.get('/users/create', usersController.create);

router.post('/users/create',
	upload.single('avatar'),
	validate.postCreate,
	usersController.postCreate
);

router.get('/users/:id', usersController.get);

module.exports = router;