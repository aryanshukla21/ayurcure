const PatientModel = require('../models/patientModel');
const logger = require('../utils/logger');
const bcrypt = require('bcrypt');

// Helper to reliably get patient ID and handle incomplete profiles
const getPatientId = async (userId, res) => {
    const profile = await PatientModel.getProfileByUserId(userId);
    if (!profile) {
        res.status(404).json({ error: 'Patient profile incomplete. Please complete onboarding.' });
        return null;
    }
    return profile.id;
};

exports.completePatientProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { age, gender, health_history, prakriti_type, referral_code } = req.body;

        const existingProfile = await PatientModel.getProfileByUserId(userId);
        if (existingProfile) {
            return res.status(409).json({ error: 'Profile already exists.' });
        }

        const newProfile = await PatientModel.registerPatient(userId, {
            age, gender, health_history, prakriti_type, referral_code
        });

        res.status(201).json({ message: 'Profile created.', profile: newProfile });
    } catch (error) {
        logger.error(`Patient Onboarding Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to complete onboarding.' });
    }
};

exports.getDashboard = async (req, res) => {
    try {
        const patientId = await getPatientId(req.user.id, res);
        if (!patientId) return;

        const [upcomingAppointment, recentHealthLog, wellnessPlan] = await Promise.all([
            PatientModel.getUpcomingAppointment(patientId),
            PatientModel.getLatestHealthLog(patientId),
            PatientModel.getWellnessPlan(patientId)
        ]);

        res.status(200).json({
            upcomingAppointment,
            recentHealthLog,
            wellnessPlan
        });
    } catch (error) {
        logger.error(`Dashboard Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to load dashboard.' });
    }
};

exports.updatePrakriti = async (req, res) => {
    try {
        const { prakriti_type } = req.body;
        const patientId = await getPatientId(req.user.id, res);
        if (!patientId) return;

        if (!['Vata', 'Pitta', 'Kapha'].includes(prakriti_type)) {
            return res.status(400).json({ error: 'Invalid Prakriti type.' });
        }

        await PatientModel.updatePrakriti(patientId, prakriti_type);

        // Baseline AI generation logic placeholder
        const planData = generateBaselineWellnessPlan(prakriti_type);

        const plan = await PatientModel.createWellnessPlan(patientId, planData);

        res.status(200).json({ message: 'Prakriti updated and plan generated.', plan });
    } catch (error) {
        logger.error(`Prakriti Update Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to update Prakriti.' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const profile = await PatientModel.getFullProfile(req.user.id);
        if (!profile) return res.status(404).json({ error: 'Profile not found.' });
        res.status(200).json({ profile });
    } catch (error) {
        logger.error(`Get Profile Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch profile.' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const patientId = await getPatientId(req.user.id, res);
        if (!patientId) return;

        const updatedProfile = await PatientModel.updateProfile(patientId, req.body);

        if (!updatedProfile) {
            return res.status(404).json({ error: 'Profile not found.' });
        }

        res.status(200).json({ message: 'Profile updated successfully.', profile: updatedProfile });
    } catch (error) {
        logger.error(`Update Profile Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to update profile.' });
    }
};

exports.addHealthLogs = async (req, res) => {
    try {
        const patientId = await getPatientId(req.user.id, res);
        if (!patientId) return;

        const log = await PatientModel.addHealthLog(patientId, req.body);
        res.status(201).json({ message: 'Log added.', log });
    } catch (error) {
        logger.error(`Add Health Log Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to add health log.' });
    }
};

exports.getHealthLogs = async (req, res) => {
    try {
        const patientId = await getPatientId(req.user.id, res);
        if (!patientId) return;

        const logs = await PatientModel.getHealthLogs(patientId);
        res.status(200).json({ logs });
    } catch (error) {
        logger.error(`Get Health Logs Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch health logs.' });
    }
};

exports.getAllAppointments = async (req, res) => {
    try {
        const patientId = await getPatientId(req.user.id, res);
        if (!patientId) return;

        const appointments = await PatientModel.getAllAppointments(patientId);
        res.status(200).json({ appointments });
    } catch (error) {
        logger.error(`Get Appointments Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch appointments.' });
    }
};

exports.getAppointment = async (req, res) => {
    try {
        const patientId = await getPatientId(req.user.id, res);
        if (!patientId) return;

        const appointment = await PatientModel.getAppointmentById(req.params.id, patientId);
        if (!appointment) return res.status(404).json({ error: 'Appointment not found.' });

        res.status(200).json({ appointment });
    } catch (error) {
        logger.error(`Get Appointment Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch appointment.' });
    }
};

// Fetch the most recent health stats for the Overview page
exports.getHealthStats = async (req, res) => {
    try {
        const patientId = await getPatientId(req.user.id, res);
        if (!patientId) return;

        const stats = await PatientModel.getHealthStats(patientId);
        // Return the stats, or null if no stats exist yet
        res.status(200).json(stats || null);
    } catch (err) {
        logger.error(`Health Stats Error: ${err.message}`);
        res.status(500).json({ error: 'Failed to fetch health stats.' });
    }
};

// Fetch the Daily Dincharya (Routine)
exports.getDailyRoutine = async (req, res) => {
    try {
        const patientId = await getPatientId(req.user.id, res);
        if (!patientId) return;

        const routine = await PatientModel.getDailyRoutine(patientId);
        res.status(200).json(routine || null);
    } catch (err) {
        logger.error(`Get Routine Error: ${err.message}`);
        res.status(500).json({ error: 'Failed to fetch daily routine.' });
    }
};

// Create or Update the Daily Dincharya
exports.updateDailyRoutine = async (req, res) => {
    try {
        const patientId = await getPatientId(req.user.id, res);
        if (!patientId) return;

        await PatientModel.updateDailyRoutine(patientId, req.body);
        res.status(200).json({ message: 'Daily routine updated successfully.' });
    } catch (err) {
        logger.error(`Update Routine Error: ${err.message}`);
        res.status(500).json({ error: 'Failed to update daily routine.' });
    }
};

// Fetch active medicine regimen for the patient
exports.getCurrentRegimen = async (req, res) => {
    try {
        const patientId = await getPatientId(req.user.id, res);
        if (!patientId) return;

        const regimen = await PatientModel.getCurrentRegimen(patientId);
        res.status(200).json(regimen);
    } catch (err) {
        logger.error(`Regimen Error: ${err.message}`);
        res.status(500).json({ error: 'Failed to fetch current regimen.' });
    }
};

// Fetch a random wellness tip
exports.getWellnessTip = async (req, res) => {
    try {
        const tip = await PatientModel.getWellnessTip();

        if (!tip) {
            // Fallback tip if the table is currently empty
            return res.status(200).json({
                content: "Start your day with a glass of warm water and a slice of lemon to awaken your digestion."
            });
        }
        res.status(200).json(tip);
    } catch (err) {
        logger.error(`Wellness Tip Error: ${err.message}`);
        // Fallback tip in case the table doesn't exist yet during development
        res.status(200).json({
            content: "Practice mindful eating: chew your food thoroughly to aid digestion and nutrient absorption."
        });
    }
};

// --- Internal Business Logic Helpers ---

const generateBaselineWellnessPlan = (prakriti) => {
    const plans = {
        'Vata': {
            dinacharya_routine: 'Wake up by 6:00 AM. Warm sesame oil massage (Abhyanga). Drink warm water with a pinch of salt.',
            diet_chart: 'Favor warm, moist, grounding foods. Root vegetables, warm grains, ghee, and sweet fruits. Avoid cold, dry, or raw foods.',
            yoga_schedule: 'Slow, grounding practices. Sun Salutations at a slow pace, Tree Pose, Corpse Pose.'
        },
        'Pitta': {
            dinacharya_routine: 'Wake up by 5:30 AM. Coconut or sunflower oil massage. Cool water wash.',
            diet_chart: 'Favor cool, refreshing, mildly spiced foods. Sweet fruits, leafy greens, cucumber, dairy. Avoid excessively spicy, sour, or fried foods.',
            yoga_schedule: 'Cooling practices. Moon Salutations, Seated Forward Bends, Alternate Nostril Breathing.'
        },
        'Kapha': {
            dinacharya_routine: 'Wake up by 5:00 AM (before sunrise). Dry brushing (Garshana) or mustard oil massage. Vigorous exercise.',
            diet_chart: 'Favor warm, light, spicy, and astringent foods. Beans, vegetables, apples, ginger. Avoid heavy dairy, sweets, and cold foods.',
            yoga_schedule: 'Vigorous and stimulating practices. Fast Sun Salutations, Warrior Poses, Breath of Fire.'
        }
    };
    return plans[prakriti] || plans['Vata']; // Fallback
};

// Assuming your uploadMiddleware returns the file path in req.file.path
exports.uploadDocument = async (req, res) => {
    try {
        const patientId = await getPatientId(req.user.id, res);
        if (!patientId) return;

        if (!req.file) {
            return res.status(400).json({ error: 'No file provided.' });
        }

        const { document_name, document_type } = req.body;
        const fileUrl = req.file.path; // Or wherever your cloud storage URL is saved

        // Add this query to your PatientModel or run it directly here
        const query = `
            INSERT INTO PatientDocuments (patient_id, document_name, document_type, file_url)
            VALUES ($1, $2, $3, $4) RETURNING *;
        `;
        const { rows } = await db.query(query, [patientId, document_name, document_type, fileUrl]);

        res.status(201).json({ message: 'Document uploaded successfully.', document: rows[0] });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ error: 'Failed to upload document.' });
    }
};