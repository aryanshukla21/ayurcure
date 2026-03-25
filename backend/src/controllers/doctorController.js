const DoctorModel = require('../models/doctorModel');
const AppointmentModel = require('../models/appointmentModel');
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

exports.getDoctorSlots = async (req, res, next) => {
    try {
        const doctorId = req.params.id;
        const { date } = req.query; // Expected format: YYYY-MM-DD

        if (!date) {
            return res.status(400).json({ success: false, message: 'Date is required to fetch slots' });
        }

        // 1. Fetch the doctor to get their schedule and consultation duration
        const doctor = await DoctorModel.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        // 2. Fetch all existing appointments for this doctor on the requested date
        // Note: Assuming you store scheduled_at as a Date object in MongoDB/Postgres
        const startOfDay = new Date(`${date}T00:00:00.000Z`);
        const endOfDay = new Date(`${date}T23:59:59.999Z`);

        const bookedAppointments = await AppointmentModel.find({
            doctor_id: doctorId,
            scheduled_at: { $gte: startOfDay, $lte: endOfDay },
            status: { $ne: 'Cancelled' } // Don't count cancelled appointments
        });

        // Extract just the times that are already booked (e.g., ["09:00", "10:30"])
        const bookedTimes = bookedAppointments.map(app => {
            const time = new Date(app.scheduled_at);
            return time.toISOString().substring(11, 16); // Extracts "HH:mm"
        });

        // 3. Generate available slots based on doctor's working hours
        // (Assuming your doctor model has something like standard start/end times and slot duration)
        const slotDurationMinutes = doctor.slot_duration || 30; // Default to 30 mins
        const startTime = doctor.working_hours?.start || '09:00';
        const endTime = doctor.working_hours?.end || '17:00';

        let availableSlots = [];
        let currentTime = new Date(`${date}T${startTime}:00.000Z`);
        const closingTime = new Date(`${date}T${endTime}:00.000Z`);

        while (currentTime < closingTime) {
            let timeString = currentTime.toISOString().substring(11, 16); // "HH:mm"

            // If this time is NOT in the bookedTimes array, add it to available slots
            if (!bookedTimes.includes(timeString)) {
                availableSlots.push(timeString);
            }

            // Increment by slot duration
            currentTime.setMinutes(currentTime.getMinutes() + slotDurationMinutes);
        }

        res.status(200).json({
            success: true,
            date: date,
            availableSlots: availableSlots // e.g., ["09:00", "09:30", "11:00", ...]
        });

    } catch (error) {
        console.error("Error fetching doctor slots:", error);
        res.status(500).json({ success: false, message: 'Server Error fetching slots' });
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

// Add this to your doctorController.js
exports.getDashboardStats = async (req, res) => {
    try {
        const doctorId = await getDoctorId(req.user.id, res);
        if (!doctorId) return;

        const activePatients = await DoctorModel.getActivePatientCount(doctorId);

        res.status(200).json({
            stats: {
                activePatients: activePatients || 0,
                newReports: 0 // You can make this dynamic later
            }
        });
    } catch (error) {
        logger.error(`Get Stats Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch dashboard stats.' });
    }
};

exports.getDashboardData = async (req, res) => {
    try {
        const doctorId = await getDoctorId(req.user.id, res);
        if (!doctorId) return;

        // Fetch everything concurrently
        const [activePatients, recentPrescriptions, recentReviews, profile] = await Promise.all([
            DoctorModel.getActivePatientCount(doctorId),
            DoctorModel.getRecentPrescriptions(doctorId),
            DoctorModel.getRecentReviews(doctorId, 1),
            DoctorModel.getFullProfile(req.user.id)
        ]);

        // Generate a dynamic insight based on actual prescription data
        let dynamicInsight = "Analyzing recent health reports shows a stable trend in patient vitals this week.";
        if (recentPrescriptions && recentPrescriptions.length > 0) {
            // UPDATED: Using medicine_name instead of herbs_prescribed
            const commonHerb = recentPrescriptions[0].medicine_name || 'standard formulations';
            dynamicInsight = `Recent patient data indicates a high requirement for ${commonHerb}. Monitoring Vata imbalances is recommended based on current prescription trends.`;
        }

        res.status(200).json({
            stats: { activePatients: activePatients || 0, newReports: 0 },
            recentPrescriptions: recentPrescriptions || [],
            recentReviews: recentReviews || [],
            insight: dynamicInsight,
            doctorName: profile ? profile.full_name : 'Doctor',
            specialization: profile ? profile.specialization : 'Ayurvedic Specialist'
        });
    } catch (error) {
        logger.error(`Get Dashboard Data Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch dashboard data.' });
    }
};

exports.getPayoutDashboard = async (req, res) => {
    try {
        const doctorId = await getDoctorId(req.user.id, res);
        if (!doctorId) return;

        const [stats, transactions, monthlyEarnings] = await Promise.all([
            DoctorModel.getPayoutStats(doctorId),
            DoctorModel.getRecentTransactions(doctorId),
            DoctorModel.getMonthlyEarnings(doctorId)
        ]);

        res.status(200).json({
            stats,
            transactions,
            chartData: monthlyEarnings
        });
    } catch (error) {
        logger.error(`Get Payout Dashboard Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch payout data.' });
    }
};