const express = require('express');
const multer = require('multer');

const router = express.Router();
const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');
const middlewareLogin = require('../middleware/login.middleware');

const upload = multer({ dest: './public/uploads' });

// router.get('/', controller.index);

// router.get('/search', controller.search);

// router.get('/create', controller.create);

// router.post('/create',
// 	upload.single('avatar'),
// 	validate.postCreate,
// 	controller.postCreate
// );

// router.get('/:id', controller.get);

// router.get('/edit/:id', controller.edit);

// router.post('/edit/:id',
// 	upload.single('avatar'),
// 	validate.postEdit,
// 	controller.postEdit
// );

router.get('/cart', controller.cart);

router.get('/edit', middlewareLogin.postLogin1, controller.edit);

router.post('/edit',
	upload.single('avatar'),
	validate.postEdit,
	controller.postEdit
);

module.exports = router;