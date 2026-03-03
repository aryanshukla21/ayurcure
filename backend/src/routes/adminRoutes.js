const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');
const { validateBodyFields } = require('../middlewares/validateRequest');

router.use(requireAuth);
router.use(requireRole('admin'));

router.get('/stats', adminController.getStats);
router.get('/users', adminController.getAllUsers);

router.put('/users/:id/ban',
    validateBodyFields(['status', 'reason']),
    adminController.banUser
);

router.get('/doctors/pending', adminController.getPendingDoctors);

router.put('/doctors/:id/verify',
    validateBodyFields(['status', 'comments']),
    adminController.verifyDoctor
);

module.exports = router;