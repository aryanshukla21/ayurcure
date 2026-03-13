const DoctorModel = require('../models/doctorModel');
const db = require('../config/db');
const logger = require('../utils/logger');

const getDoctorId = async (userId, res) => {
    const profile = await DoctorModel.getProfileByUserId(userId);
    if (!profile) {
        res.status(404).json({ error: 'Doctor profile incomplete. Please submit your application first.' });
        return null;
    }
    return profile.id;
};

exports.searchDoctors = async (req, res) => {
    try {
        const { specialization } = req.query;
        const doctors = await DoctorModel.searchDoctors({ specialization });
        res.status(200).json({ doctors });
    } catch (error) {
        logger.error(`Search Doctors Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to search doctors.' });
    }
};

exports.submitProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const existingProfile = await DoctorModel.getProfileByUserId(userId);
        if (existingProfile) {
            return res.status(409).json({ error: 'Profile application already submitted.' });
        }
        const profile = await DoctorModel.createDoctorProfile(userId, req.body);
        res.status(201).json({ message: 'Application submitted for verification.', profile });
    } catch (error) {
        if (error.code === '23505') return res.status(409).json({ error: 'Medical registration number already in use.' });
        logger.error(`Submit Profile Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to submit profile.' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const profile = await DoctorModel.getFullProfile(req.user.id);
        if (!profile) return res.status(404).json({ error: 'Profile not found.' });
        res.status(200).json({ profile });
    } catch (error) {
        logger.error(`Get Profile Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch profile.' });
    }
};

exports.updateAvailability = async (req, res) => {
    try {
        const doctorId = await getDoctorId(req.user.id, res);
        if (!doctorId) return;

        const availability = await DoctorModel.addAvailability(doctorId, req.body);
        res.status(201).json({ message: 'Availability added successfully.', availability });
    } catch (error) {
        logger.error(`Update Availability Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to add availability.' });
    }
};

exports.addArticle = async (req, res) => {
    try {
        const doctorId = await getDoctorId(req.user.id, res);
        if (!doctorId) return;

        const article = await DoctorModel.createArticle(doctorId, req.body);
        res.status(201).json({ message: 'Article submitted for review.', article });
    } catch (error) {
        logger.error(`Add Article Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to submit article.' });
    }
};

exports.getAllAppointments = async (req, res) => {
    try {
        const doctorId = await getDoctorId(req.user.id, res);
        if (!doctorId) return;

        const appointments = await DoctorModel.getAllAppointments(doctorId);
        res.status(200).json({ appointments });
    } catch (error) {
        logger.error(`Get Appointments Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch appointments.' });
    }
};

exports.getAppointment = async (req, res) => {
    try {
        const doctorId = await getDoctorId(req.user.id, res);
        if (!doctorId) return;

        const appointment = await DoctorModel.getAppointmentById(req.params.id, doctorId);
        if (!appointment) return res.status(404).json({ error: 'Appointment not found.' });

        res.status(200).json({ appointment });
    } catch (error) {
        logger.error(`Get Appointment Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch appointment.' });
    }
};

exports.getPatientProfile = async (req, res) => {
    try {
        const doctorId = await getDoctorId(req.user.id, res);
        if (!doctorId) return;

        const patientId = req.params.id;
        const profile = await DoctorModel.getPatientProfileForDoctor(patientId);

        if (!profile) return res.status(404).json({ error: 'Patient not found.' });

        res.status(200).json({ profile });
    } catch (error) {
        logger.error(`Get Patient Profile Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch patient profile.' });
    }
};