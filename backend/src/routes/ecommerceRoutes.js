const express = require('express');
const router = express.Router();
const ecommerceController = require('../controllers/ecommerceController');
const { requireAuth } = require('../middlewares/authMiddleware');

// Publicly accessible product catalog
router.get('/products', ecommerceController.getProducts);

// Protected e-commerce operations
router.use(requireAuth);

router.post('/orders', ecommerceController.placeOrder);
router.get('/orders', ecommerceController.getUserOrders);
router.post('/orders/:id/payment', ecommerceController.updatePaymentStatus);

module.exports = router;