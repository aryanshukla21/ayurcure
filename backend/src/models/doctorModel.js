const db = require('../config/db');

class DoctorModel {
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
}

module.exports = DoctorModel;