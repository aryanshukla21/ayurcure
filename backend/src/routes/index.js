const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const patientRoutes = require('./patientRoutes');
const doctorRoutes = require('./doctorRoutes');
const appointmentRoutes = require('./appointmentRoutes');
const ecommerceRoutes = require('./ecommerceRoutes');
const adminRoutes = require('./adminRoutes');
const consultationRoutes = require('./consultationRoutes');

// Mount the route modules to specific paths
router.use('/auth', authRoutes);
router.use('/patients', patientRoutes);
router.use('/doctors', doctorRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/ecommerce', ecommerceRoutes);
router.use('/admin', adminRoutes);
router.use('/consultations', consultationRoutes);

module.exports = router;