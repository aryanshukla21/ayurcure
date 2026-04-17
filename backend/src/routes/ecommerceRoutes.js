const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ecommerceController');
const { requireAuth } = require('../middlewares/authMiddleware');

// STORE
router.get('/pharmacy-store/all', ctrl.getAllProducts);
router.get('/pharmacy-store/herbal-suppliments', ctrl.getHerbalSupplements);
router.get('/pharmacy-store/digestive-care', ctrl.getDigestiveCare);
router.get('/pharmacy-store/immunity-booster', ctrl.getImmunityBoosters);
router.get('/pharmacy-store/skin-care', ctrl.getSkinCare);
router.get('/pharmacy-store/wellness-products', ctrl.getWellnessProducts);
router.get('/pharmacy-store/product/:id/details', ctrl.getProductDetails);

router.use(requireAuth); // Protect orders and cart

// PHARMACY ORDERS
router.get('/pharmacy-orders/orders/in-progress', ctrl.getInProgressOrders);
router.get('/pharmacy-orders/orders/shipped-today', ctrl.getShippedToday);
router.get('/pharmacy-orders/orders/total-spent', ctrl.getTotalSpent);
router.get('/pharmacy-orders/order-history', ctrl.getOrderHistory);
router.get('/pharmacy-orders/order-history/filter/status=:status-sort-by=:sort', ctrl.filterOrderHistory);
router.get('/pharmacy-orders/refill-reminder', ctrl.getRefillReminder);
router.get('/pharmacy-orders/need-assistance', ctrl.getAssistanceInfo);
router.get('/pharmacy-orders/order-history/export-all', ctrl.exportOrderHistory);

// ORDER DETAILS
router.get('/order/:id/order-details', ctrl.getOrderDetails);
router.get('/order/:id/ordered-products', ctrl.getOrderedProducts);
router.get('/order/:id/delivery-projects', ctrl.getDeliveryStatus);
router.get('/order/:id/payment-summary', ctrl.getPaymentSummary);
router.get('/order/:id/download-invoice', ctrl.downloadInvoice);
router.get('/order/:id/wellness-tip', ctrl.getOrderWellnessTip);

// CART
router.get('/cart/product-details', ctrl.getCartProductDetails);
router.get('/cart/order-summary', ctrl.getCartOrderSummary);
router.post('/cart/apply-promo-code', ctrl.applyPromoCode);

module.exports = router;