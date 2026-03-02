const db = require('../config/db');

class PatientModel {
    static async registerPatient(userId, patientData) {
        const { age, gender, health_history, prakriti_type, referral_code } = patientData;
        const query = `
            INSERT INTO PatientProfiles (user_id, age, gender, health_history, prakriti_type, referral_code)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const values = [userId, age, gender, health_history, prakriti_type, referral_code];
        const { rows } = await db.query(query, values);
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

    static async addHealthLog(patientId, logData) {
        const { log_date, sleep_hours, water_intake, stress_level, symptoms } = logData;
        const query = `
            INSERT INTO HealthLogs (patient_id, log_date, sleep_hours, water_intake, stress_level, symptoms)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const values = [patientId, log_date, sleep_hours, water_intake, stress_level, symptoms];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    static async addMedicalRecord(patientId, recordData) {
        const { record_type, file_url } = recordData;
        const query = `
            INSERT INTO MedicalRecords (patient_id, record_type, file_url)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const { rows } = await db.query(query, [patientId, record_type, file_url]);
        return rows[0];
    }
}

module.exports = PatientModel;