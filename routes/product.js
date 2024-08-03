const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addProducts } = require('../controllers/productController');

router.post('/products', auth, addProducts);

module.exports = router;
