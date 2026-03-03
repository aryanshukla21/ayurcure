const EcommerceModel = require('../models/ecommerceModel');
const PatientModel = require('../models/patientModel');
const paymentService = require('../services/paymentService');
const logger = require('../utils/logger');

/**
 * Utility: Gets the PatientProfile ID for the authenticated User
 */
const getPatientId = async (userId) => {
    const profile = await PatientModel.getProfileByUserId(userId);
    if (!profile) throw new Error('Patient profile not found. Please complete onboarding.');
    return profile.id;
};

// ==========================================
// PUBLIC: PRODUCT CATALOG
// ==========================================

exports.getProducts = async (req, res) => {
    try {
        const { category, prakriti_suitability, search } = req.query;
        const products = await EcommerceModel.getProducts({ category, prakriti_suitability, search });
        res.status(200).json({ products });
    } catch (error) {
        logger.error(`Get Products Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch products.' });
    }
};

exports.getProductDetails = async (req, res) => {
    try {
        const product = await EcommerceModel.getProductById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found.' });
        res.status(200).json({ product });
    } catch (error) {
        logger.error(`Get Product Details Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch product details.' });
    }
};

// ==========================================
// PROTECTED: PATIENT OPERATIONS
// ==========================================

exports.toggleWishlist = async (req, res) => {
    try {
        const patientId = await getPatientId(req.user.id);
        const { product_id } = req.body;

        const result = await EcommerceModel.toggleWishlist(patientId, product_id);
        const message = result.added ? 'Added to wishlist.' : 'Removed from wishlist.';

        res.status(200).json({ message, added: result.added });
    } catch (error) {
        logger.error(`Wishlist Toggle Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to update wishlist.' });
    }
};

exports.getWishlist = async (req, res) => {
    try {
        const patientId = await getPatientId(req.user.id);
        const products = await EcommerceModel.getWishlist(patientId);
        res.status(200).json({ wishlist: products });
    } catch (error) {
        logger.error(`Get Wishlist Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch wishlist.' });
    }
};

exports.placeOrder = async (req, res) => {
    try {
        const patientId = await getPatientId(req.user.id);
        const { items, total_amount, discount_applied, shipping_address, payment_method } = req.body;

        if (!items || items.length === 0) return res.status(400).json({ error: 'Cart is empty.' });

        // 1. Create DB Order & Deduct Stock
        const { orderId } = await EcommerceModel.placeOrder({
            patient_id: patientId,
            total_amount,
            discount_applied: discount_applied || 0,
            shipping_address,
            payment_method
        }, items);

        // 2. Initialize Payment Gateway if not Cash on Delivery
        if (payment_method === 'Online') {
            const gatewayOrder = await paymentService.createOrder(total_amount, orderId);
            return res.status(201).json({
                message: 'Order created. Pending payment.',
                orderId,
                gatewayPayload: gatewayOrder
            });
        }

        res.status(201).json({ message: 'Order placed successfully.', orderId });
    } catch (error) {
        logger.error(`Place Order Error: ${error.message}`);
        if (error.message.includes('Insufficient stock')) {
            return res.status(409).json({ error: error.message });
        }
        res.status(500).json({ error: 'Failed to process order.' });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = req.body;

        const isValid = paymentService.verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);

        if (!isValid) {
            await EcommerceModel.updatePaymentStatus(order_id, 'Failed');
            return res.status(400).json({ error: 'Payment verification failed. Signature mismatch.' });
        }

        const updatedOrder = await EcommerceModel.updatePaymentStatus(order_id, 'Paid');
        res.status(200).json({ message: 'Payment verified successfully.', order: updatedOrder });
    } catch (error) {
        logger.error(`Verify Payment Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to verify payment.' });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const patientId = await getPatientId(req.user.id);
        const orders = await EcommerceModel.getUserOrders(patientId);
        res.status(200).json({ orders });
    } catch (error) {
        logger.error(`Get Orders Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch orders.' });
    }
};