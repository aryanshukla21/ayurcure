const AppointmentModel = require('../models/appointmentModel');
const DoctorModel = require('../models/doctorModel');
const PatientModel = require('../models/patientModel');
const logger = require('../utils/logger');

/**
 * Utility function to translate an Auth User ID into a domain-specific Profile ID.
 */
const getProfileId = async (userRole, userId) => {
    if (userRole === 'patient') {
        const profile = await PatientModel.getProfileByUserId(userId);
        return profile ? profile.id : null;
    }
    if (userRole === 'doctor') {
        const profile = await DoctorModel.getProfileByUserId(userId);
        return profile ? profile.id : null;
    }
    return null;
};

exports.getAppointments = async (req, res) => {
    try {
        const profileId = await getProfileId(req.user.role, req.user.id);
        if (!profileId) return res.status(403).json({ error: 'Profile not found.' });

        let appointments;
        if (req.user.role === 'patient') {
            appointments = await PatientModel.getAllAppointments(profileId);
        } else if (req.user.role === 'doctor') {
            appointments = await DoctorModel.getAllAppointments(profileId);
        } else {
            return res.status(403).json({ error: 'Invalid role.' });
        }

        res.status(200).json({ appointments });
    } catch (error) {
        logger.error(`Get Appointments Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch appointments.' });
    }
};

exports.bookAppointment = async (req, res) => {
    try {
        // Enforce role isolation
        if (req.user.role !== 'patient') {
            return res.status(403).json({ error: 'Only patients can book appointments.' });
        }

        const patientId = await getProfileId('patient', req.user.id);
        if (!patientId) return res.status(403).json({ error: 'Patient profile required.' });

        const { doctor_id, scheduled_at, mode, pre_consultation_symptoms, chief_complaint } = req.body;

        const appointment = await AppointmentModel.bookAppointment({
            patient_id: patientId,
            doctor_id,
            scheduled_at,
            mode,
            pre_consultation_symptoms,
            chief_complaint
        });

        res.status(201).json({ message: 'Appointment requested successfully.', appointment });
    } catch (error) {
        if (error.message === 'COLLISION') {
            return res.status(409).json({ error: 'Time slot is already booked for this doctor.' });
        }
        logger.error(`Booking Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to book appointment.' });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const appointmentId = req.params.id;

        // Security Check: Only doctors can confirm or complete. Patients can only cancel.
        if (req.user.role === 'patient' && status !== 'Cancelled') {
            return res.status(403).json({ error: 'Patients can only cancel appointments.' });
        }

        const updated = await AppointmentModel.updateStatus(appointmentId, status);
        res.status(200).json({ message: `Appointment ${status}.`, appointment: updated });
    } catch (error) {
        logger.error(`Status Update Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to update status.' });
    }
};

exports.addPrescription = async (req, res) => {
    try {
        if (req.user.role !== 'doctor') {
            return res.status(403).json({ error: 'Only doctors can prescribe.' });
        }

        const appointmentId = req.params.id;
        const prescription = await AppointmentModel.addPrescription(appointmentId, req.body);

        // Auto-complete the appointment when a prescription is issued
        await AppointmentModel.updateStatus(appointmentId, 'Completed');

        res.status(201).json({ message: 'Prescription added.', prescription });
    } catch (error) {
        logger.error(`Add Prescription Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to add prescription.' });
    }
};

exports.addReview = async (req, res) => {
    try {
        if (req.user.role !== 'patient') {
            return res.status(403).json({ error: 'Only patients can submit reviews.' });
        }

        const appointmentId = req.params.id;
        const review = await AppointmentModel.addReview(appointmentId, req.body);

        res.status(201).json({ message: 'Review submitted successfully.', review });
    } catch (error) {
        logger.error(`Add Review Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to submit review.' });
    }
};