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

// Fetch the most recent health stats for the Overview page
exports.getHealthStats = async (req, res) => {
    try {
        // Fetches the latest health log/stats for the patient
        const query = `
            SELECT weight, sleep_hours, dosha_balance, bp 
            FROM health_stats 
            WHERE patient_id = $1 
            ORDER BY created_at DESC 
            LIMIT 1
        `;
        const { rows } = await db.query(query, [req.user.id]);

        // Return the stats, or null if no stats exist yet (frontend handles null gracefully)
        res.status(200).json(rows[0] || null);
    } catch (err) {
        console.error("Health Stats Error:", err);
        res.status(500).json({ error: 'Failed to fetch health stats.' });
    }
};

// Fetch the Daily Dincharya (Routine)
exports.getDailyRoutine = async (req, res) => {
    try {
        const query = `
            SELECT morning, afternoon, evening, night 
            FROM patient_routines 
            WHERE patient_id = $1
        `;
        const { rows } = await db.query(query, [req.user.id]);
        res.status(200).json(rows[0] || null);
    } catch (err) {
        console.error("Get Routine Error:", err);
        res.status(500).json({ error: 'Failed to fetch daily routine.' });
    }
};

// Create or Update the Daily Dincharya
exports.updateDailyRoutine = async (req, res) => {
    try {
        const { morning, afternoon, evening, night } = req.body;

        // UPSERT query: Inserts a new row, or updates the existing one if patient_id already exists
        const query = `
            INSERT INTO patient_routines (patient_id, morning, afternoon, evening, night) 
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (patient_id) DO UPDATE 
            SET morning = EXCLUDED.morning, 
                afternoon = EXCLUDED.afternoon, 
                evening = EXCLUDED.evening, 
                night = EXCLUDED.night
        `;

        await db.query(query, [req.user.id, morning, afternoon, evening, night]);
        res.status(200).json({ message: 'Daily routine updated successfully.' });
    } catch (err) {
        console.error("Update Routine Error:", err);
        res.status(500).json({ error: 'Failed to update daily routine.' });
    }
};

// Fetch active medicine regimen for the patient
exports.getCurrentRegimen = async (req, res) => {
    try {
        const query = `
            SELECT id, medicine_name, dosage, timing, duration 
            FROM prescriptions 
            WHERE patient_id = $1 AND is_active = true
            ORDER BY created_at DESC
        `;
        const { rows } = await db.query(query, [req.user.id]);
        res.status(200).json(rows);
    } catch (err) {
        console.error("Regimen Error:", err);
        res.status(500).json({ error: 'Failed to fetch current regimen.' });
    }
};

// Fetch a random wellness tip
exports.getWellnessTip = async (req, res) => {
    try {
        // Randomly selects 1 tip from the database
        const query = 'SELECT content FROM wellness_tips ORDER BY RANDOM() LIMIT 1';
        const { rows } = await db.query(query);

        if (rows.length === 0) {
            // Fallback tip if the table is currently empty
            return res.status(200).json({
                content: "Start your day with a glass of warm water and a slice of lemon to awaken your digestion."
            });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        console.error("Wellness Tip Error:", err);
        // Fallback tip in case the table doesn't exist yet during development
        res.status(200).json({
            content: "Practice mindful eating: chew your food thoroughly to aid digestion and nutrient absorption."
        });
    }
};