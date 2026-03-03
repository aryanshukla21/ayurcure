const AdminModel = require('../models/adminModel');
const logger = require('../utils/logger');

exports.getStats = async (req, res, next) => {
    try {
        const stats = await AdminModel.getDashboardStats();
        res.status(200).json(stats);
    } catch (error) {
        next(error);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const { role, status } = req.query;
        const users = await AdminModel.getAllUsers({ role, status });
        res.status(200).json({ users });
    } catch (error) {
        next(error);
    }
};

exports.banUser = async (req, res, next) => {
    try {
        const { status, reason } = req.body;

        if (!['Deactivated', 'Banned', 'Active'].includes(status)) {
            return res.status(400).json({ error: 'Invalid account status.' });
        }

        const updatedUser = await AdminModel.updateUserStatus(req.params.id, status, reason);

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

exports.getPendingDoctors = async (req, res, next) => {
    try {
        const doctors = await AdminModel.getPendingDoctorApplications();
        res.status(200).json({ doctors });
    } catch (error) {
        next(error);
    }
};

exports.verifyDoctor = async (req, res, next) => {
    try {
        const doctorId = req.params.id;
        const { status, comments } = req.body;

        if (!['Verified', 'Rejected', 'Pending'].includes(status)) {
            return res.status(400).json({ error: 'Invalid verification status.' });
        }

        const updatedProfile = await AdminModel.verifyDoctor(doctorId, req.user.id, status, comments);

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