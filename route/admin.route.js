const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin.controller');
const middleWareLoginAdmin = require('../middleware/login.middleware');

router.get('', middleWareLoginAdmin.postAdmin, function(request, response) {
	response.send('asdf');
})
router.get('/users', controller.users);


module.exports = router;