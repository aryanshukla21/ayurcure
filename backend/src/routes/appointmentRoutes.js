const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { requireAuth } = require('../middlewares/authMiddleware');
const { validateBodyFields } = require('../middlewares/validateRequest');

router.use(requireAuth);

router.get('/', appointmentController.getAppointments);

// Ensure booking requests have the necessary information
router.post('/book',
    validateBodyFields(['doctor_id', 'scheduled_at', 'mode']),
    appointmentController.bookAppointment
);

// Ensure prescriptions have core data
router.post('/:id/prescription',
    validateBodyFields(['herbs_prescribed']),
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