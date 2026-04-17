const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/patientController');
const { requireAuth } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.use(requireAuth); // Protect all routes

// DASHBOARD
router.get('/dashboard/patient-details', ctrl.getDashPatientDetails);
router.get('/dashboard/upcoming-session-appointments', ctrl.getDashUpcomingSession);
router.get('/dashboard/body-weight-tracker', ctrl.getDashWeightTracker);
router.get('/dashboard/weekly-wellness-activity', ctrl.getDashWellnessActivity);
router.get('/dashboard/medical-history', ctrl.getDashMedicalHistory);
router.get('/dashboard/next-meditation-hydration-goal-sleep-quality', ctrl.getDashQuickMetrics);

// PROFILE
router.get('/profile/personal-information', ctrl.getProfilePersonal);
router.put('/profile/personal-information/update', ctrl.updateProfilePersonal);
router.get('/profile/personal-information/download', ctrl.downloadProfilePersonal);
router.get('/profile/medical-information', ctrl.getProfileMedical);
router.get('/profile/contact-information', ctrl.getProfileContact);
router.put('/profile/contact-information/update', ctrl.updateProfileContact);
router.get('/profile/emergency-contact', ctrl.getProfileEmergency);
router.put('/profile/emergency-contact/update', ctrl.updateProfileEmergency);

// SETTINGS
router.get('/settings/account-details', ctrl.getSettingsAccount);
router.put('/settings/account-details/update', ctrl.updateSettingsAccount);
router.put('/settings/change-password', ctrl.changePassword);
router.get('/settings/notifications', ctrl.getSettingsNotifications);
router.get('/settings/privacy-&-settings', ctrl.getSettingsPrivacy);
router.put('/settings/update-setting-data', ctrl.updateSettingsData);

// HEALTH REPORTS
router.post('/health-records/upload-new-report', upload.single('report'), ctrl.uploadReport);
router.get('/health-records/recent-reports', ctrl.getRecentReports);
router.get('/health-reports/:id/download', ctrl.downloadReport);
router.get('/health-reports/filters/report-name=:reportName-doctor-name=:doctorName-date=:date', ctrl.filterReports);
router.get('/health-reports/quick-insights', ctrl.getReportInsights);
router.get('/health-reports/vitality-spark', ctrl.getReportVitality);
router.get('/health-reports/wellness-goals', ctrl.getReportGoals);
router.get('/health-reports/last-changed', ctrl.getReportLastChanged);

module.exports = router;