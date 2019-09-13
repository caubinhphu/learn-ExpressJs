const express = require('express');

const router = express.Router();
const controller = require('../controllers/users.controller');
const validate = require('../validate/user-validate.js');

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.post('/create', validate.postCreate, controller.postCreate);

router.get('/:id', controller.get);

module.exports = router;