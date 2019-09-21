const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin.controller');

router.get('/users', controller.users);


module.exports = router;