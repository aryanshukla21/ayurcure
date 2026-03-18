const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

// router.post('/seed', patientController.seedPatients);

// Apply authentication and role-checking to all routes below
router.use(requireAuth);
router.use(requireRole('patient'));

// ==========================================
// EXISTING ROUTES
// ==========================================
router.post('/onboarding', patientController.completePatientProfile);
router.get('/dashboard', patientController.getDashboard);
router.post('/prakriti-assessment', patientController.updatePrakriti);
router.get('/profile', patientController.getProfile);
router.post('/health-logs', patientController.addHealthLogs);
router.get('/all-appointments', patientController.getAllAppointments);
router.get('/appointment/:id', patientController.getAppointment);

// ==========================================
// NEW OVERVIEW & ROUTINE ROUTES
// ==========================================
router.get('/health-stats', patientController.getHealthStats);
router.get('/routine', patientController.getDailyRoutine);
router.put('/routine', patientController.updateDailyRoutine);
router.get('/regimen', patientController.getCurrentRegimen);
router.get('/wellness-tip', patientController.getWellnessTip);

module.exports = router;