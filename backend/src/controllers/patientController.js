const PatientModel = require('../models/patientModel');
const logger = require('../utils/logger');

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