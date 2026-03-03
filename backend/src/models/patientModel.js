const db = require('../config/db');

class PatientModel {
    static async registerPatient(userId, patientData) {
        const { age, gender, health_history, prakriti_type, referral_code } = patientData;
        const query = `
            INSERT INTO PatientProfiles (user_id, age, gender, health_history, prakriti_type, referral_code)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const { rows } = await db.query(query, [userId, age, gender, health_history, prakriti_type, referral_code]);
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
}

module.exports = PatientModel;