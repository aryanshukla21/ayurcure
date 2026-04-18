const doctorModel = require('../models/doctorModel');
const db = require('../config/db');
const bcrypt = require('bcryptjs'); // For password update

// ==========================================
// HELPER METHOD: Get Doctor ID
// ==========================================
const getDoctorId = async (userId, res) => {
    const query = `SELECT id FROM DoctorProfiles WHERE user_id = $1`;
    const { rows } = await db.query(query, [userId]);
    if (!rows.length) {
        if (res) res.status(404).json({ success: false, message: 'Doctor profile not found.' });
        return null;
    }
    return rows[0].id;
};

// ==========================================
// DASHBOARD
// ==========================================
exports.getTotalPatients = async (req, res) => {
    try {
        const docId = await getDoctorId(req.user.id, res);
        if (!docId) return;
        const result = await doctorModel.getTotalPatients(docId);
        res.status(200).json({ success: true, totalPatients: parseInt(result.totalPatients) || 0 });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getAppointmentsToday = async (req, res) => {
    try {
        const docId = await getDoctorId(req.user.id, res);
        if (!docId) return;
        const result = await doctorModel.getAppointmentsToday(docId);
        res.status(200).json({ success: true, appointmentsToday: parseInt(result.appointmentsToday) || 0 });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getUpcomingConsultations = async (req, res) => {
    try {
        const docId = await getDoctorId(req.user.id, res);
        if (!docId) return;
        const result = await doctorModel.getUpcomingConsultations(docId);
        res.status(200).json({ success: true, upcomingConsultations: parseInt(result.upcomingConsultations) || 0 });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getRecentUpcomingAppointments = async (req, res) => {
    try {
        const docId = await getDoctorId(req.user.id, res);
        if (!docId) return;
        const appointments = await doctorModel.getRecentUpcomingAppointments(docId);
        res.status(200).json({ success: true, appointments });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getEarningSummary = async (req, res) => {
    try {
        const docId = await getDoctorId(req.user.id, res);
        if (!docId) return;
        const earnings = await doctorModel.getEarningSummary(docId);
        res.status(200).json({ success: true, earnings });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ==========================================
// APPOINTMENTS
// ==========================================
const handleAppointmentList = async (req, res, filterType) => {
    try {
        const docId = await getDoctorId(req.user.id, res);
        if (!docId) return;
        const appointments = await doctorModel.getAppointmentsList(docId, filterType);
        res.status(200).json({ success: true, appointments });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getAllAppointmentsList = (req, res) => handleAppointmentList(req, res, 'All');
exports.getTodayAppointments = (req, res) => handleAppointmentList(req, res, 'Today');
exports.getUpcomingAppointments = (req, res) => handleAppointmentList(req, res, 'Upcoming');
exports.getCompletedAppointments = (req, res) => handleAppointmentList(req, res, 'Completed');
exports.getCancelledAppointments = (req, res) => handleAppointmentList(req, res, 'Cancelled');

// ==========================================
// APPOINTMENT DETAILS
// ==========================================
exports.getApptPatientInfo = async (req, res) => {
    try {
        const docId = await getDoctorId(req.user.id, res);
        if (!docId) return;
        const info = await doctorModel.getApptPatientInfo(docId, req.params.appointmentId);
        res.status(200).json({ success: true, info });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getApptSymptoms = async (req, res) => {
    try {
        const docId = await getDoctorId(req.user.id, res);
        if (!docId) return;
        const symptoms = await doctorModel.getApptSymptoms(docId, req.params.appointmentId);
        res.status(200).json({ success: true, symptoms });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getApptReports = async (req, res) => {
    try {
        const docId = await getDoctorId(req.user.id, res);
        if (!docId) return;
        const reports = await doctorModel.getApptReports(docId, req.params.appointmentId);
        res.status(200).json({ success: true, reports });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getApptMedicalInfo = async (req, res) => {
    try {
        const docId = await getDoctorId(req.user.id, res);
        if (!docId) return;
        const medicalInfo = await doctorModel.getApptMedicalInfo(docId, req.params.appointmentId);
        res.status(200).json({ success: true, medicalInfo });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.startVideoConsultation = async (req, res) => {
    try {
        // Mocking video link generation logic for the specified appointment
        const meetLink = `https://meet.ayurcure.com/${req.params.appointmentId}`;
        res.status(200).json({ success: true, link: meetLink });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to start consultation' });
    }
};

exports.rescheduleAppointment = async (req, res) => {
    try {
        const docId = await getDoctorId(req.user.id, res);
        if (!docId) return;
        const { date, time } = req.body;
        const result = await doctorModel.rescheduleAppointment(docId, req.params.appointmentId, date, time);
        res.status(200).json({ success: true, message: 'Appointment rescheduled successfully', data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.cancelAppointment = async (req, res) => {
    try {
        const docId = await getDoctorId(req.user.id, res);
        if (!docId) return;
        const result = await doctorModel.cancelAppointment(docId, req.params.appointmentId);
        res.status(200).json({ success: true, message: 'Appointment cancelled successfully', data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ==========================================
// EARNINGS
// ==========================================
exports.getTotalEarnings = async (req, res) => {
    try {
        const docId = await getDoctorId(req.user.id, res);
        if (!docId) return;
        const total = await doctorModel.getTotalEarnings(docId);
        res.status(200).json({ success: true, total });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getMonthlyEarning = async (req, res) => {
    try {
        const docId = await getDoctorId(req.user.id, res);
        if (!docId) return;
        const monthly = await doctorModel.getMonthlyEarning(docId);
        res.status(200).json({ success: true, monthly });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getEarningHistory = async (req, res) => {
    try {
        const docId = await getDoctorId(req.user.id, res);
        if (!docId) return;
        const history = await doctorModel.getEarningHistory(docId);
        res.status(200).json({ success: true, history });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ==========================================
// PROFILE
// ==========================================
exports.getProfilePersonalInfo = async (req, res) => {
    try {
        const info = await doctorModel.getProfilePersonalInfo(req.user.id);
        res.status(200).json({ success: true, info });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getNextConsultation = async (req, res) => {
    try {
        const docId = await getDoctorId(req.user.id, res);
        if (!docId) return;
        const consultation = await doctorModel.getNextConsultation(docId);
        res.status(200).json({ success: true, consultation });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getContactInfo = async (req, res) => {
    try {
        const info = await doctorModel.getContactInfo(req.user.id);
        res.status(200).json({ success: true, info });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getCredentials = async (req, res) => {
    try {
        const credentials = await doctorModel.getCredentials(req.user.id);
        res.status(200).json({ success: true, credentials });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getPhilosophy = async (req, res) => {
    try {
        const philosophy = await doctorModel.getPhilosophy(req.user.id);
        res.status(200).json({ success: true, philosophy: philosophy?.philosophy_of_care });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ==========================================
// SETTINGS
// ==========================================
exports.getSettingsPersonalInfo = async (req, res) => {
    try {
        const info = await doctorModel.getSettingsPersonalInfo(req.user.id);
        res.status(200).json({ success: true, info });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.updateSettingsPersonalInfo = async (req, res) => {
    try {
        await doctorModel.updateSettingsPersonalInfo(req.user.id, req.body);
        res.status(200).json({ success: true, message: 'Personal information updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getPreferences = async (req, res) => {
    try {
        const preferences = await doctorModel.getPreferences(req.user.id);
        res.status(200).json({ success: true, preferences });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.updatePreferences = async (req, res) => {
    try {
        await doctorModel.updatePreferences(req.user.id, req.body);
        res.status(200).json({ success: true, message: 'Preferences updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getProfessionalCredentials = async (req, res) => {
    try {
        const credentials = await doctorModel.getProfessionalCredentials(req.user.id);
        res.status(200).json({ success: true, credentials });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.updateProfessionalCredentials = async (req, res) => {
    try {
        await doctorModel.updateProfessionalCredentials(req.user.id, req.body);
        res.status(200).json({ success: true, message: 'Credentials updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getConsultationLogistics = async (req, res) => {
    try {
        const logistics = await doctorModel.getConsultationLogistics(req.user.id);
        res.status(200).json({ success: true, logistics });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.updateConsultationLogistics = async (req, res) => {
    try {
        await doctorModel.updateConsultationLogistics(req.user.id, req.body);
        res.status(200).json({ success: true, message: 'Logistics updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getPhilosophyOfCare = async (req, res) => {
    try {
        const result = await doctorModel.getPhilosophyOfCare(req.user.id);
        res.status(200).json({ success: true, philosophy: result?.philosophy_of_care });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.updatePhilosophyOfCare = async (req, res) => {
    try {
        // Frontend might send { philosophy_of_care: '...' }
        const philosophy = req.body.philosophy_of_care || req.body.philosophy;
        await doctorModel.updatePhilosophyOfCare(req.user.id, philosophy);
        res.status(200).json({ success: true, message: 'Philosophy of care updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.updateAccountPassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        // Fetch current user details
        const { rows } = await db.query('SELECT password_hash FROM Users WHERE id = $1', [userId]);
        if (!rows.length) return res.status(404).json({ success: false, message: 'User not found' });

        const user = rows[0];

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
        if (!isMatch) return res.status(400).json({ success: false, message: 'Incorrect current password' });

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const newHash = await bcrypt.hash(newPassword, salt);

        // Update database
        await db.query('UPDATE Users SET password_hash = $1 WHERE id = $2', [newHash, userId]);

        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};