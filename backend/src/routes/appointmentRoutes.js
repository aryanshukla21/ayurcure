const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/appointmentController');
const { requireAuth } = require('../middlewares/authMiddleware');

router.use(requireAuth);

// APPOINTMENT LISTS
router.get('/all-appointment', ctrl.getAll);
router.get('/upcoming-appointment', ctrl.getUpcoming);
router.get('/completed-appointment', ctrl.getCompleted);
router.get('/cancelled-appointment', ctrl.getCancelled);
router.get('/this-month', ctrl.getThisMonth);
router.get('/filter/doctor-name=:doctorName', ctrl.filterByDoctor);
router.get('/ayurvedic-insight', ctrl.getAyurvedicInsight);
router.get('/prepare-for-your-next-visit', ctrl.getPrepInstructions);

// APPOINTMENT DETAILS
router.get('/:id/actions', ctrl.getActions);
router.get('/:id/your-symptoms-and-notes', ctrl.getSymptoms);
router.get('/:id/practitioner-info', ctrl.getPractitionerInfo);
router.get('/:id/related-documents', ctrl.getDocuments);
router.get('/:id/related-documents/download', ctrl.downloadDocument);

// BOOK APPOINTMENT
router.get('/book-appointment/view-all-practitioners', ctrl.getAllPractitioners);
router.get('/book-appointment/view-all-practitioners/filter', ctrl.filterPractitioners);
router.get('/book-appointment/view-all-practitioners/search=:doctorName', ctrl.searchPractitioners);
router.get('/book-appointment/view-all-practitioners/select/:doctorId', ctrl.selectPractitioner);
router.get('/book-appointment/view-all-practitioners/select/:doctorId/available-slots', ctrl.getAvailableSlots);
router.get('/book-appointment/view-all-practitioners/select/:doctorId/appointment-summary', ctrl.getBookingSummary);
router.get('/book-appointment/prakriti-analysis', ctrl.getPrakritiAnalysis);

// PRESCRIPTIONS
router.get('/prescription/all-prescriptions', ctrl.getAllPrescriptions);
router.get('/prescription/all-prescription/:id/view-pdf', ctrl.downloadPrescriptionPdf);
router.get('/prescription/automated-refills', ctrl.getAutomatedRefills);
router.get('/prescription/expert-consultation', ctrl.getExpertConsultation);

module.exports = router;