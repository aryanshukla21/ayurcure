const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');
const { validateBodyFields } = require('../middlewares/validationMiddleware');

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

// Admins can trigger health reminders and promotional offers
router.post('/broadcast',
    validateBodyFields(['topic', 'title', 'body']),
    adminController.sendBroadcastNotification
);

module.exports = router;