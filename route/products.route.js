const express = require('express');
const router = express.Router();

const controller = require('../controllers/products.controller');

router.get('', controller.index);

router.get('/search', controller.search);

router.get('/:id', controller.view);

module.exports = router;