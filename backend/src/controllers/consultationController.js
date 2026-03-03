const agoraService = require('../services/agoraService');
const AppointmentModel = require('../models/appointmentModel');

exports.getCallToken = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const userId = req.user.id; // From authMiddleware

        // 1. Fetch appointment details
        const appointment = await AppointmentModel.getById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found.' });
        }

        // 2. Security Check: Ensure the requester is the assigned doctor or patient
        // This prevents unauthorized users from joining random calls
        const isParticipant = (appointment.patient_id === userId || appointment.doctor_id === userId);
        // Note: You may need to resolve User IDs to Profile IDs depending on your implementation

        // 3. Status Validation: Only allow "Scheduled" appointments
        if (appointment.status !== 'Scheduled') {
            return res.status(403).json({
                error: `Cannot join call. Appointment is currently ${appointment.status}.`
            });
        }

        // 4. Generate Token if checks pass
        const uid = Math.floor(Math.random() * 1000000);
        const token = agoraService.generateRTCToken(appointmentId, uid);

        res.status(200).json({
            token,
            channelName: appointmentId,
            uid,
            appId: process.env.AGORA_APP_ID
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};