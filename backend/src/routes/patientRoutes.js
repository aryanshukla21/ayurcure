const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

// Apply authentication middleware to all patient routes
router.use(requireAuth);
router.use(requireRole('patient'));

router.get('/dashboard', patientController.getDashboard);
router.post('/prakriti-assessment', patientController.updatePrakriti);
router.get('/profile', patientController.getProfile);
router.post('/health-logs', patientController.addHealthLogs);
router.get('/all-appointments', patientController.getAllAppointments);
router.get('/appointments/:id', patientController.getAppointment);

module.exports = router;