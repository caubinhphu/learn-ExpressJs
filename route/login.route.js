const express = require('express');
const router = express.Router();

const controller = require('../controllers/login.controller');
const validate = require('../validate/login.validate');

router.get('', controller.login);

router.post('', validate.postLogin, controller.postLogin);

module.exports = router;
