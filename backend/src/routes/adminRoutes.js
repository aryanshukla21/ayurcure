const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');
const { validateBodyFields } = require('../middlewares/validationMiddleware');

router.use(requireAuth);
router.use(requireRole('admin'));

// Dashboard & Users
router.get('/stats', adminController.getStats);
router.get('/users', adminController.getAllUsers);
router.put('/users/:id/ban', validateBodyFields(['status', 'reason']), adminController.banUser);

// Admin / Co-workers
router.get('/admins', adminController.getAdmins);
router.post('/admins', validateBodyFields(['full_name', 'email', 'password']), adminController.createAdmin);

// Doctors
router.get('/doctors', adminController.getAllDoctors);
router.get('/doctors/pending', adminController.getPendingDoctors);
router.put('/doctors/:id/verify', validateBodyFields(['status', 'comments']), adminController.verifyDoctor);

// Orders & Reports
router.get('/orders', adminController.getAllOrders);
router.get('/reports', adminController.getReportData);

// Blogs (CMS)
router.get('/blogs', adminController.getAllBlogs);
router.get('/blogs/:id', adminController.getBlogById);
router.post('/blogs', validateBodyFields(['title', 'content']), adminController.createBlog);
router.put('/blogs/:id', validateBodyFields(['title', 'content']), adminController.updateBlog);
router.delete('/blogs/:id', adminController.deleteBlog);

// Notifications
router.post('/broadcast', validateBodyFields(['topic', 'title', 'body']), adminController.sendBroadcastNotification);

module.exports = router;