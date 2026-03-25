const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.use(requireAuth);
router.use(requireRole('patient'));

router.post('/onboarding', patientController.completePatientProfile);
router.get('/dashboard', patientController.getDashboard);
router.post('/prakriti-assessment', patientController.updatePrakriti);
router.get('/profile', patientController.getProfile);
router.post('/health-logs', patientController.addHealthLogs);
router.get('/all-appointments', patientController.getAllAppointments);
router.get('/appointment/:id', patientController.getAppointment);
router.get('/health-stats', patientController.getHealthStats);
router.get('/routine', patientController.getDailyRoutine);
router.put('/routine', patientController.updateDailyRoutine);
router.get('/regimen', patientController.getCurrentRegimen);
router.get('/wellness-tip', patientController.getWellnessTip);
router.put('/profile', patientController.updateProfile);
router.get('/health-logs', patientController.getHealthLogs);

// Add this route under your Patient Operations
// 'document' is the field name expected from the frontend FormData
router.post('/documents', upload.single('document'), patientController.uploadDocument);

module.exports = router;