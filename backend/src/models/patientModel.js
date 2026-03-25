const db = require('../config/db');

class PatientModel {
    // ==========================================
    // 1. REGISTRATION & PROFILE MANAGEMENT
    // ==========================================

    static async registerPatient(userId, patientData) {
        const {
            age, gender, health_history, prakriti_type, referral_code,
            patient_display_id, clinical_status, dob, blood_group,
            height_cm, weight_kg, bmi, vikruti, address, diet_preference, allergies,
            emergency_contact_name, emergency_contact_relation, emergency_contact_phone,
            chief_complaints, medical_history, current_medications,
            lifestyle_profile, treatment_plan, doctor_notes, primary_doctor_id
        } = patientData;

        const query = `
            INSERT INTO PatientProfiles (
                user_id, age, gender, health_history, prakriti_type, referral_code,
                patient_display_id, clinical_status, dob, blood_group, 
                height_cm, weight_kg, bmi, vikruti, address, diet_preference, allergies,
                emergency_contact_name, emergency_contact_relation, emergency_contact_phone,
                chief_complaints, medical_history, current_medications,
                lifestyle_profile, treatment_plan, doctor_notes, primary_doctor_id
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, 
                $7, $8, $9, $10, 
                $11, $12, $13, $14, $15, $16, $17, 
                $18, $19, $20, 
                $21, $22, $23, 
                $24, $25, $26, $27
            )
            RETURNING *;
        `;

        const values = [
            userId, age, gender, health_history, prakriti_type, referral_code,
            patient_display_id, clinical_status || 'Active', dob, blood_group,
            height_cm, weight_kg, bmi, vikruti, address, diet_preference, allergies,
            emergency_contact_name, emergency_contact_relation, emergency_contact_phone,
            chief_complaints || null,
            medical_history || null,
            current_medications ? JSON.stringify(current_medications) : null,
            lifestyle_profile, treatment_plan, doctor_notes, primary_doctor_id
        ];

        const { rows } = await db.query(query, values);
        return rows[0];
    }

    static async getProfileByUserId(userId) {
        const query = `SELECT * FROM PatientProfiles WHERE user_id = $1;`;
        const { rows } = await db.query(query, [userId]);
        return rows[0];
    }

    static async getFullProfile(userId) {
        const query = `
            SELECT u.full_name, u.email, u.phone, p.* FROM Users u 
            JOIN PatientProfiles p ON u.id = p.user_id 
            WHERE u.id = $1;
        `;
        const { rows } = await db.query(query, [userId]);
        return rows[0];
    }

    static async updateProfile(patientId, profileData) {
        const { age, gender, health_history, prakriti_type } = profileData;
        const query = `
            UPDATE PatientProfiles 
            SET age = COALESCE($1, age),
                gender = COALESCE($2, gender),
                health_history = COALESCE($3, health_history),
                prakriti_type = COALESCE($4, prakriti_type),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $5
            RETURNING *;
        `;
        const { rows } = await db.query(query, [age, gender, health_history, prakriti_type, patientId]);
        return rows[0];
    }

    // ==========================================
    // 2. PRAKRITI & WELLNESS PLANS
    // ==========================================

    static async updatePrakriti(patientId, prakriti_type) {
        const query = `UPDATE PatientProfiles SET prakriti_type = $1 WHERE id = $2 RETURNING *;`;
        const { rows } = await db.query(query, [prakriti_type, patientId]);
        return rows[0];
    }

    static async createWellnessPlan(patientId, planData) {
        const { dinacharya_routine, diet_chart, yoga_schedule } = planData;
        const query = `
            INSERT INTO WellnessPlans (patient_id, dinacharya_routine, diet_chart, yoga_schedule, generated_at)
            VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
            ON CONFLICT (patient_id) DO UPDATE 
            SET dinacharya_routine = EXCLUDED.dinacharya_routine,
                diet_chart = EXCLUDED.diet_chart,
                yoga_schedule = EXCLUDED.yoga_schedule,
                generated_at = CURRENT_TIMESTAMP
            RETURNING *;
        `;
        const { rows } = await db.query(query, [patientId, dinacharya_routine, diet_chart, yoga_schedule]);
        return rows[0];
    }

    static async getWellnessPlan(patientId) {
        const query = `SELECT * FROM WellnessPlans WHERE patient_id = $1;`;
        const { rows } = await db.query(query, [patientId]);
        return rows[0];
    }

    static async getWellnessTip() {
        const query = `SELECT content FROM wellness_tips ORDER BY RANDOM() LIMIT 1;`;
        const { rows } = await db.query(query);
        return rows[0];
    }

    // ==========================================
    // 3. HEALTH LOGS & STATS
    // ==========================================

    static async addHealthLog(patientId, logData) {
        const { log_date, sleep_hours, water_intake, stress_level, symptoms } = logData;
        const query = `
            INSERT INTO HealthLogs (patient_id, log_date, sleep_hours, water_intake, stress_level, symptoms)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const { rows } = await db.query(query, [patientId, log_date, sleep_hours, water_intake, stress_level, symptoms]);
        return rows[0];
    }

    static async getLatestHealthLog(patientId) {
        const query = `SELECT * FROM HealthLogs WHERE patient_id = $1 ORDER BY log_date DESC LIMIT 1;`;
        const { rows } = await db.query(query, [patientId]);
        return rows[0];
    }

    static async getHealthLogs(patientId) {
        const query = `SELECT * FROM HealthLogs WHERE patient_id = $1 ORDER BY log_date DESC;`;
        const { rows } = await db.query(query, [patientId]);
        return rows;
    }

    static async getHealthStats(patientId) {
        const query = `
            SELECT weight, sleep_hours, dosha_balance, bp 
            FROM health_stats 
            WHERE patient_id = $1 
            ORDER BY created_at DESC 
            LIMIT 1;
        `;
        const { rows } = await db.query(query, [patientId]);
        return rows[0];
    }

    // ==========================================
    // 4. DAILY ROUTINE (DINACHARYA)
    // ==========================================

    static async getDailyRoutine(patientId) {
        const query = `
            SELECT morning, afternoon, evening, night 
            FROM patient_routines 
            WHERE patient_id = $1;
        `;
        const { rows } = await db.query(query, [patientId]);
        return rows[0];
    }

    static async updateDailyRoutine(patientId, routineData) {
        const { morning, afternoon, evening, night } = routineData;
        const query = `
            INSERT INTO patient_routines (patient_id, morning, afternoon, evening, night) 
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (patient_id) DO UPDATE 
            SET morning = EXCLUDED.morning, 
                afternoon = EXCLUDED.afternoon, 
                evening = EXCLUDED.evening, 
                night = EXCLUDED.night
            RETURNING *;
        `;
        const { rows } = await db.query(query, [patientId, morning, afternoon, evening, night]);
        return rows[0];
    }

    // ==========================================
    // 5. APPOINTMENTS & REGIMENS
    // ==========================================

    static async getUpcomingAppointment(patientId) {
        const query = `
            SELECT a.id, a.scheduled_at, a.mode, u.full_name AS doctor_name
            FROM Appointments a
            JOIN DoctorProfiles d ON a.doctor_id = d.id
            JOIN Users u ON d.user_id = u.id
            WHERE a.patient_id = $1 AND a.status = 'Scheduled' AND a.scheduled_at > CURRENT_TIMESTAMP
            ORDER BY a.scheduled_at ASC LIMIT 1;
        `;
        const { rows } = await db.query(query, [patientId]);
        return rows[0];
    }

    static async getAllAppointments(patientId) {
        const query = `
            SELECT a.id, a.scheduled_at, a.mode, a.status, u.full_name AS doctor_name, d.specialization
            FROM Appointments a
            JOIN DoctorProfiles d ON a.doctor_id = d.id
            JOIN Users u ON d.user_id = u.id
            WHERE a.patient_id = $1
            ORDER BY a.scheduled_at DESC;
        `;
        const { rows } = await db.query(query, [patientId]);
        return rows;
    }

    static async getAppointmentById(appointmentId, patientId) {
        const query = `
            SELECT a.*, u.full_name AS doctor_name, d.specialization, 
                   p.herbs_prescribed, p.dosage, p.duration, p.lifestyle_advice
            FROM Appointments a
            JOIN DoctorProfiles d ON a.doctor_id = d.id
            JOIN Users u ON d.user_id = u.id
            LEFT JOIN Prescriptions p ON a.id = p.appointment_id
            WHERE a.id = $1 AND a.patient_id = $2;
        `;
        const { rows } = await db.query(query, [appointmentId, patientId]);
        return rows[0];
    }

    static async getCurrentRegimen(patientId) {
        const query = `
            SELECT id, medicine_name, dosage, timing, duration 
            FROM Prescriptions 
            WHERE patient_id = $1 AND is_active = true
            ORDER BY created_at DESC;
        `;
        const { rows } = await db.query(query, [patientId]);
        return rows;
    }
}

module.exports = PatientModel;