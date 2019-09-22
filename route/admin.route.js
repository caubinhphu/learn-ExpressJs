const express = require('express');
const multer = require('multer');

const router = express.Router();

const productsController = require('../controllers/admin.products.controller');
const usersController = require('../controllers/admin.users.controller');
const validateUser = require('../validate/user.validate');
const validateProduct = require('../validate/product.validate');

const upload = multer({ dest: './public/uploads' });
// const uploadProduct = upload.fields([
// 		{ name: 'primary', maxCount: 1 },
// 		{ name: 'secondary' }
// 	]);

router.get('/products', productsController.index);

router.get('/products/create', productsController.create);

router.post('/products/create',
	upload.array('images'),
	validateProduct.postProduct,
	productsController.postProduct
);

router.get('/users', usersController.index);

router.get('/users/search', usersController.search);

router.get('/users/create', usersController.create);

router.post('/users/create',
	upload.single('avatar'),
	validateUser.postCreate,
	usersController.postCreate
);

router.get('/users/:id', usersController.get);

module.exports = router;