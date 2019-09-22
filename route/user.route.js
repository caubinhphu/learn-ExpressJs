const express = require('express');
const multer = require('multer');

const router = express.Router();
const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');
const middlewareLogin = require('../middleware/login.middleware');

const upload = multer({ dest: './public/uploads' });

router.get('/cart', controller.cart);

router.get('/edit', middlewareLogin.postLogin1, controller.edit);

router.post('/edit',
	upload.single('avatar'),
	validate.postEdit,
	controller.postEdit
);

module.exports = router;