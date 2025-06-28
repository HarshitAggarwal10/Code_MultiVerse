const express = require('express');
const router = express.Router();
const { createOrder, confirmPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-order', protect, createOrder);
router.post('/confirm', protect, confirmPayment);

module.exports = router;
