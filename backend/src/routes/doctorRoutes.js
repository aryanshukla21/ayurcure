const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

// Public route for finding doctors
router.get('/', doctorController.searchDoctors);

// Protected routes for doctors
router.use(requireAuth);
router.use(requireRole('doctor'));

router.post('/apply', doctorController.submitProfile);
router.put('/availability', doctorController.updateAvailability);
router.get('/profile', doctorController.getProfile);
router.get('/patient-profile/:id', doctorController.getPatientProfile);
router.get('/all-appointments', doctorController.getAllAppointments);
router.get('/appointments/:id', doctorController.getAppointment);

module.exports = router;