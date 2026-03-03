const express = require('express');
const router = express.Router();
const ecommerceController = require('../controllers/ecommerceController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

// ==========================================
// PUBLIC ROUTES (Anyone can view products)
// ==========================================
router.get('/products', ecommerceController.getProducts);
router.get('/products/:id', ecommerceController.getProductDetails);

// ==========================================
// PROTECTED ROUTES (Patients Only)
// ==========================================
router.use(requireAuth);
router.use(requireRole('patient')); // Ensures only patients can buy things

// Wishlist
router.get('/wishlist', ecommerceController.getWishlist);
router.post('/wishlist/toggle', ecommerceController.toggleWishlist);

// Ordering & Payments
router.post('/orders', ecommerceController.placeOrder);
router.get('/orders', ecommerceController.getUserOrders);
router.post('/orders/verify-payment', ecommerceController.verifyPayment);

module.exports = router;