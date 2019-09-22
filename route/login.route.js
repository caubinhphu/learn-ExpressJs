const express = require('express');
const multer = require('multer');

const router = express.Router();

const controller = require('../controllers/login.controller');
const validateLogin = require('../validate/login.validate');
const validateUser = require('../validate/user.validate');

const upload = multer({ dest: './public/uploads' });

router.get('', controller.login);

router.post('', validateLogin.postLogin, controller.postLogin);
router.get('/logout', controller.logout);
router.get('/signup', controller.signUp);
router.post('/signup',
	upload.single('avatar'),
	validateUser.postSignUp,
	controller.postSignUp
);

module.exports = router;
