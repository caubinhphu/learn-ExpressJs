const express = require('express');
const multer = require('multer');

const router = express.Router();
const controller = require('../controllers/users.controller');
const validate = require('../validate/user.validate');

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

router.get('/edit/:id', controller.edit);

router.post('/edit/:id',
	upload.single('avatar'),
	validate.postEdit,
	controller.edit
);

module.exports = router;