const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { requireAuth } = require('../middlewares/authMiddleware');

router.use(requireAuth); // Both Patients and Doctors interact with these routes

router.get('/', appointmentController.getAppointments);
router.post('/book', appointmentController.bookAppointment);
router.post('/:id/prescription', appointmentController.addPrescription); // Should validate doctor role in controller
router.put('/:id/status', appointmentController.updateStatus);
router.post('/:id/review', appointmentController.addReview); // Should validate patient role in controller

module.exports = router;