const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

// ==========================================
// PUBLIC ROUTES
// ==========================================
router.get('/', doctorController.searchDoctors);
router.get('/:id/slots', doctorController.getDoctorSlots);

// ==========================================
// PROTECTED ROUTES (Doctor Role Only)
// ==========================================
router.use(requireAuth);
router.use(requireRole('doctor'));

// Profile & Verification
router.post('/apply', doctorController.submitProfile);
router.get('/profile', doctorController.getProfile);
router.put('/profile', doctorController.updateProfile); // <--- Added

// Availability & Content
router.post('/availability', doctorController.updateAvailability);
router.post('/articles', doctorController.addArticle);

// Clinical Operations
router.get('/all-appointments', doctorController.getAllAppointments);
router.get('/appointments/:id', doctorController.getAppointment);
router.get('/patient-profile/:id', doctorController.getPatientProfile);
router.get('/stats', doctorController.getDashboardStats);
router.get('/dashboard-data', doctorController.getDashboardData);
router.get('/payouts', doctorController.getPayoutDashboard);

module.exports = router;