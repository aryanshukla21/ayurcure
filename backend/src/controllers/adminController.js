const AdminModel = require('../models/adminModel');
const UserModel = require('../models/userModel');
const notificationService = require('../services/notificationService');
const logger = require('../utils/logger');
const bcrypt = require('bcrypt');

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

// --- CO-WORKER / ADMIN MANAGEMENT ---
exports.getAdmins = async (req, res, next) => {
    try {
        const admins = await AdminModel.getAllUsers({ role: 'admin' });
        res.status(200).json({ admins });
    } catch (error) {
        next(error);
    }
};

exports.createAdmin = async (req, res, next) => {
    try {
        const { full_name, email, phone, password } = req.body;
        const existingUser = await UserModel.getUserByEmail(email);
        if (existingUser) return res.status(409).json({ error: 'Email already in use.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await UserModel.createUser({
            full_name, email, phone, password_hash: hashedPassword, role: 'admin', account_status: 'Active'
        });

        await AdminModel.logAction({
            admin_id: req.user.id,
            action_type: 'CREATE_ADMIN',
            target_entity_id: newAdmin.id,
            details: `Created new admin account for ${email}`
        });
        res.status(201).json({ message: 'Admin created successfully.', admin: { id: newAdmin.id, email: newAdmin.email } });
    } catch (error) {
        next(error);
    }
};

// --- DOCTOR MANAGEMENT ---
exports.getAllDoctors = async (req, res, next) => {
    try {
        const doctors = await AdminModel.getAllDoctors();
        res.status(200).json({ doctors });
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

// --- ORDER MANAGEMENT ---
exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await AdminModel.getAllOrders();
        res.status(200).json({ orders });
    } catch (error) {
        next(error);
    }
};

// --- BLOG MANAGEMENT ---
exports.createBlog = async (req, res, next) => {
    try {
        const blog = await AdminModel.createBlog(req.user.id, req.body);
        res.status(201).json({ message: 'Blog published successfully.', blog });
    } catch (error) {
        logger.error(`Create Blog Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to create blog.' });
    }
};

exports.getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await AdminModel.getAllBlogs();
        res.status(200).json({ blogs });
    } catch (error) {
        next(error);
    }
};

exports.getBlogById = async (req, res, next) => {
    try {
        const blog = await AdminModel.getBlogById(req.params.id);
        if (!blog) return res.status(404).json({ error: 'Blog not found.' });
        res.status(200).json({ blog });
    } catch (error) {
        next(error);
    }
};

exports.updateBlog = async (req, res, next) => {
    try {
        const blog = await AdminModel.updateBlog(req.params.id, req.body);
        res.status(200).json({ message: 'Blog updated successfully.', blog });
    } catch (error) {
        next(error);
    }
};

exports.deleteBlog = async (req, res, next) => {
    try {
        await AdminModel.deleteBlog(req.params.id);
        res.status(200).json({ message: 'Blog deleted successfully.' });
    } catch (error) {
        next(error);
    }
};

// --- REPORTS ---
exports.getReportData = async (req, res, next) => {
    try {
        const revenueData = await AdminModel.getRevenueChartData();
        res.status(200).json({ charts: { revenue: revenueData } });
    } catch (error) {
        next(error);
    }
};

// --- BROADCAST ---
exports.sendBroadcastNotification = async (req, res) => {
    try {
        const { topic, title, body, data } = req.body;
        const allowedTopics = ['offers', 'health_reminders', 'general'];
        if (!allowedTopics.includes(topic)) return res.status(400).json({ error: 'Invalid topic.' });

        const response = await notificationService.sendTopicNotification(topic, title, body, data || {});
        if (response) {
            res.status(200).json({ message: `Broadcast sent successfully to topic: ${topic}` });
        } else {
            res.status(500).json({ error: 'Failed to dispatch broadcast.' });
        }
    } catch (error) {
        logger.error(`Broadcast Error: ${error.message}`);
        res.status(500).json({ error: 'Internal server error during broadcast.' });
    }
};