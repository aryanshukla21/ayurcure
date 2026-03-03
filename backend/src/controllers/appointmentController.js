const AppointmentModel = require('../models/appointmentModel');
const DoctorModel = require('../models/doctorModel');
const PatientModel = require('../models/patientModel');
const UserModel = require('../models/userModel');
const notificationService = require('../services/notificationService');
const logger = require('../utils/logger');

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

exports.bookAppointment = async (req, res) => {
    try {
        if (req.user.role !== 'patient') {
            return res.status(403).json({ error: 'Only patients can book.' });
        }

        const patientId = await getProfileId('patient', req.user.id);
        const { doctor_id, scheduled_at, mode, pre_consultation_symptoms, chief_complaint } = req.body;

        const appointment = await AppointmentModel.bookAppointment({
            patient_id: patientId,
            doctor_id,
            scheduled_at,
            mode,
            pre_consultation_symptoms,
            chief_complaint
        });

        // 1. Transactional SMS
        if (req.user.phone) {
            const message = `AyurCure: Your ${mode} consultation is scheduled for ${new Date(scheduled_at).toLocaleString()}.`;
            await notificationService.sendSMS(req.user.phone, message);
        }

        // 2. Push Notification to Patient
        if (req.user.fcm_token) {
            await notificationService.sendPushNotification(
                req.user.fcm_token,
                'Appointment Confirmed',
                `Your ${mode} consultation is confirmed for ${new Date(scheduled_at).toLocaleString()}.`,
                { appointmentId: appointment.id.toString(), type: 'CONFIRMATION' }
            );
        }

        res.status(201).json({ message: 'Appointment booked.', appointment });
    } catch (error) {
        logger.error(`Booking Error: ${error.message}`);
        res.status(500).json({ error: 'Booking failed.' });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const appointmentId = req.params.id;

        const updated = await AppointmentModel.updateStatus(appointmentId, status);
        const appointmentDetails = await AppointmentModel.getById(appointmentId);

        if (appointmentDetails) {
            const patientProfile = await PatientModel.getProfileById(appointmentDetails.patient_id);
            if (patientProfile) {
                const patientUser = await UserModel.getUserById(patientProfile.user_id);

                // Trigger notification for critical status changes
                if (patientUser && patientUser.fcm_token) {
                    let title = 'Consultation Update';
                    let body = `Your appointment status is now: ${status}.`;

                    if (status === 'Cancelled') title = 'Appointment Cancelled';
                    if (status === 'Confirmed') title = 'Appointment Confirmed';

                    await notificationService.sendPushNotification(
                        patientUser.fcm_token,
                        title,
                        body,
                        { appointmentId: appointmentId.toString(), status, type: 'STATUS_CHANGE' }
                    );
                }
            }
        }

        res.status(200).json({ message: `Status updated to ${status}.`, appointment: updated });
    } catch (error) {
        logger.error(`Status Update Error: ${error.message}`);
        res.status(500).json({ error: 'Update failed.' });
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