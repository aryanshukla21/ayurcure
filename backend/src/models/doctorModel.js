const db = require('../config/db');

class DoctorModel {
    // ==========================================
    // PROFILE MANAGEMENT
    // ==========================================

    static async createDoctorProfile(userId, docData) {
        const { qualifications, registration_number, specialization, experience_years, consultation_fee } = docData;
        const query = `
            INSERT INTO DoctorProfiles (user_id, qualifications, registration_number, specialization, experience_years, consultation_fee)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const values = [userId, qualifications, registration_number, specialization, experience_years, consultation_fee];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    static async getProfileByUserId(userId) {
        const query = `SELECT * FROM DoctorProfiles WHERE user_id = $1;`;
        const { rows } = await db.query(query, [userId]);
        return rows[0];
    }

    static async getFullProfile(userId) {
        const query = `
            SELECT u.full_name, u.email, u.phone, d.* FROM Users u 
            JOIN DoctorProfiles d ON u.id = d.user_id 
            WHERE u.id = $1;
        `;
        const { rows } = await db.query(query, [userId]);
        return rows[0];
    }

    static async searchDoctors(filters = {}) {
        let query = `
            SELECT d.id, u.full_name, d.specialization, d.experience_years, d.consultation_fee 
            FROM DoctorProfiles d
            JOIN Users u ON d.user_id = u.id
            WHERE d.verification_status = 'Verified'
        `;
        const values = [];
        if (filters.specialization) {
            values.push(`%${filters.specialization}%`);
            query += ` AND d.specialization ILIKE $${values.length}`;
        }
        const { rows } = await db.query(query, values);
        return rows;
    }

    // ==========================================
    // AVAILABILITY & CONTENT
    // ==========================================

    static async addAvailability(doctorId, availData) {
        const { day_of_week, start_time, end_time } = availData;
        const query = `
            INSERT INTO DoctorAvailabilities (doctor_id, day_of_week, start_time, end_time)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const { rows } = await db.query(query, [doctorId, day_of_week, start_time, end_time]);
        return rows[0];
    }

    static async createArticle(doctorId, articleData) {
        const { title, content } = articleData;
        const query = `
            INSERT INTO Articles (doctor_id, title, content)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const { rows } = await db.query(query, [doctorId, title, content]);
        return rows[0];
    }

    // ==========================================
    // CLINICAL OPERATIONS (APPOINTMENTS)
    // ==========================================

    static async getAllAppointments(doctorId) {
        const query = `
            SELECT a.id, a.scheduled_at, a.mode, a.status, u.full_name AS patient_name, p.age, p.gender
            FROM Appointments a
            JOIN PatientProfiles p ON a.patient_id = p.id
            JOIN Users u ON p.user_id = u.id
            WHERE a.doctor_id = $1
            ORDER BY a.scheduled_at ASC;
        `;
        const { rows } = await db.query(query, [doctorId]);
        return rows;
    }

    static async getAppointmentById(appointmentId, doctorId) {
        const query = `
            SELECT a.*, u.full_name AS patient_name, p.age, p.gender, p.health_history, p.prakriti_type
            FROM Appointments a
            JOIN PatientProfiles p ON a.patient_id = p.id
            JOIN Users u ON p.user_id = u.id
            WHERE a.id = $1 AND a.doctor_id = $2;
        `;
        const { rows } = await db.query(query, [appointmentId, doctorId]);
        return rows[0];
    }

    static async getPatientProfileForDoctor(patientId) {
        const query = `
            SELECT u.full_name, u.email, u.phone, p.* FROM PatientProfiles p
            JOIN Users u ON p.user_id = u.id
            WHERE p.id = $1;
        `;
        const { rows } = await db.query(query, [patientId]);
        return rows[0];
    }
}

module.exports = DoctorModel;