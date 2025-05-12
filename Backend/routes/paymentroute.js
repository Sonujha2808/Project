// routes/paymentRoutes.js
const express = require('express');
const { createOrder } = require('../controllers/paymentcontroller'); // ✅ Use require

const router = express.Router();

router.post('/create-order', createOrder);

module.exports = router; // ✅ Use module.exports
