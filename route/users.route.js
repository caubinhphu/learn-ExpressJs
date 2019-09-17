const express = require('express');
const multer = require('multer');

const router = express.Router();
const controller = require('../controllers/users.controller');
const validate = require('../validate/user.validate');

const upload = multer({ dest: './public/uploads' });

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.post('/create',
	upload.single('avatar'),
	validate.postCreate,
	controller.postCreate
);

router.get('/:id', controller.get);

module.exports = router;