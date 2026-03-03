const AdminModel = require('../models/adminModel');
const notificationService = require('../services/notificationService');
const logger = require('../utils/logger');

/**
 * Fetches high-level system statistics for the admin dashboard.
 */
exports.getStats = async (req, res, next) => {
    try {
        const stats = await AdminModel.getDashboardStats();
        res.status(200).json(stats);
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves a list of all users, with optional filtering by role or account status.
 */
exports.getAllUsers = async (req, res, next) => {
    try {
        const { role, status } = req.query;
        const users = await AdminModel.getAllUsers({ role, status });
        res.status(200).json({ users });
    } catch (error) {
        next(error);
    }
};

/**
 * Bans or deactivates a user account.
 */
exports.banUser = async (req, res, next) => {
    try {
        const { status, reason } = req.body;

        if (!['Deactivated', 'Banned', 'Active'].includes(status)) {
            return res.status(400).json({ error: 'Invalid account status.' });
        }

        const updatedUser = await AdminModel.updateUserStatus(req.params.id, status, reason);

        // Audit Logging
        await AdminModel.logAction({
            admin_id: req.user.id,
            action_type: 'UPDATE_USER_STATUS',
            target_entity_id: req.params.id,
            details: `Status changed to ${status}. Reason: ${reason}`
        });

        res.status(200).json({ message: 'User status updated successfully.', user: updatedUser });
    } catch (error) {
        next(error);
    }
};

/**
 * Lists all doctors who have submitted their profiles but are not yet verified.
 */
exports.getPendingDoctors = async (req, res, next) => {
    try {
        const doctors = await AdminModel.getPendingDoctorApplications();
        res.status(200).json({ doctors });
    } catch (error) {
        next(error);
    }
};

/**
 * Verifies or rejects a doctor's professional credentials.
 */
exports.verifyDoctor = async (req, res, next) => {
    try {
        const doctorId = req.params.id;
        const { status, comments } = req.body;

        if (!['Verified', 'Rejected', 'Pending'].includes(status)) {
            return res.status(400).json({ error: 'Invalid verification status.' });
        }

        const updatedProfile = await AdminModel.verifyDoctor(doctorId, req.user.id, status, comments);

        // Audit Logging
        await AdminModel.logAction({
            admin_id: req.user.id,
            action_type: 'VERIFY_DOCTOR',
            target_entity_id: doctorId,
            details: `Doctor verification set to ${status}. Comments: ${comments}`
        });

        res.status(200).json({ message: `Doctor profile ${status.toLowerCase()}.`, profile: updatedProfile });
    } catch (error) {
        next(error);
    }
};

/**
 * Broadcasts a push notification to all users subscribed to a specific topic.
 * Topics: 'offers', 'health_reminders', 'general'.
 */
exports.sendBroadcastNotification = async (req, res) => {
    try {
        const { topic, title, body, data } = req.body;

        const allowedTopics = ['offers', 'health_reminders', 'general'];
        if (!allowedTopics.includes(topic)) {
            return res.status(400).json({ error: 'Invalid topic. Allowed topics: offers, health_reminders, general.' });
        }

        const payloadData = data || {};

        const response = await notificationService.sendTopicNotification(topic, title, body, payloadData);

        if (response) {
            res.status(200).json({ message: `Broadcast sent successfully to topic: ${topic}` });
        } else {
            res.status(500).json({ error: 'Failed to dispatch broadcast. Ensure Firebase Admin is correctly configured.' });
        }
    } catch (error) {
        logger.error(`Broadcast Error: ${error.message}`);
        res.status(500).json({ error: 'Internal server error during broadcast.' });
    }
};