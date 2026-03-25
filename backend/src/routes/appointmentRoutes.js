const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { requireAuth } = require('../middlewares/authMiddleware');
const { validateBodyFields } = require('../middlewares/validationMiddleware');

router.use(requireAuth);

router.post('/book',
    validateBodyFields(['doctor_id', 'scheduled_at', 'mode']),
    appointmentController.bookAppointment
);

// Updated fields to match the database schema
router.post('/:id/prescription',
    validateBodyFields(['medicine_name', 'dosage', 'timing', 'duration']),
    appointmentController.addPrescription
);

router.put('/:id/status',
    validateBodyFields(['status']),
    appointmentController.updateStatus
);

router.post('/:id/review',
    validateBodyFields(['rating']),
    appointmentController.addReview
);

module.exports = router;