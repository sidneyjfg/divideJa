const express = require('express');
const router = express.Router();

// Controllers
const { getOrders, createOrder } = require('../controllers/ordersController.js');

router.get('/', getOrders);
router.post('/', createOrder);

module.exports = router;