const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getQuotations, downloadQuotation } = require('../controllers/quotationController');

router.get('/quotations', auth, getQuotations);
router.get('/quotations/:id', auth, downloadQuotation);

module.exports = router;
