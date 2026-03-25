const db = require('../config/db');

class DoctorModel {
    // ==========================================
    // PROFILE MANAGEMENT
    // ==========================================

    static async createDoctorProfile(userId, docData) {
        const {
            qualifications, registration_number, specialization, experience_years, consultation_fee,
            location, languages, consultation_duration_mins, availability_summary, publications_count,
            average_rating, total_reviews, bio, sub_specializations, certifications, education_details
        } = docData;

        const query = `
            INSERT INTO DoctorProfiles (
                user_id, qualifications, registration_number, specialization, experience_years, 
                consultation_fee, location, languages, consultation_duration_mins, availability_summary, 
                publications_count, average_rating, total_reviews, bio, sub_specializations, 
                certifications, education_details, verification_status
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, 'Verified')
            RETURNING *;
        `;

        const values = [
            userId, qualifications, registration_number, specialization, experience_years,
            consultation_fee, location, languages || [], consultation_duration_mins || 30, availability_summary,
            publications_count || 0, average_rating || 0.00, total_reviews || 0, bio, sub_specializations || [],
            certifications || [], education_details ? JSON.stringify(education_details) : '[]'
        ];

        const { rows } = await db.query(query, values);
        return rows[0];
    }

    static async getProfileByUserId(userId) {
        const query = `SELECT * FROM DoctorProfiles WHERE user_id = $1;`;
        const { rows } = await db.query(query, [userId]);
        return rows[0];
    }

    static async getProfileById(id) {
        const query = `SELECT * FROM DoctorProfiles WHERE id = $1;`;
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async getFullProfile(userId) {
        const query = `
            SELECT d.*, u.full_name, u.email, u.phone 
            FROM DoctorProfiles d
            JOIN Users u ON d.user_id = u.id
            WHERE d.user_id = $1;
        `;
        const { rows } = await db.query(query, [userId]);
        return rows[0];
    }

    static async updateProfile(doctorId, profileData) {
        const { consultation_fee, bio, experience_years, availability_summary } = profileData;
        const query = `
            UPDATE DoctorProfiles 
            SET consultation_fee = COALESCE($1, consultation_fee),
                bio = COALESCE($2, bio),
                experience_years = COALESCE($3, experience_years),
                availability_summary = COALESCE($4, availability_summary),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $5
            RETURNING *;
        `;
        const { rows } = await db.query(query, [consultation_fee, bio, experience_years, availability_summary, doctorId]);
        return rows[0];
    }

    static async searchDoctors(filters = {}) {
        let query = `
            SELECT d.*, u.full_name as name, u.email, u.phone 
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
            INSERT INTO DoctorSlots (doctor_id, start_time, end_time)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const { rows } = await db.query(query, [doctorId, start_time, end_time]);
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
            SELECT a.id, a.start_time, a.end_time, a.mode, a.status, u.full_name AS patient_name, p.age, p.gender
            FROM Appointments a
            JOIN PatientProfiles p ON a.patient_id = p.id
            JOIN Users u ON p.user_id = u.id
            WHERE a.doctor_id = $1
            ORDER BY a.start_time ASC;
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

    // ==========================================
    // DASHBOARD WIDGET QUERIES
    // ==========================================

    static async getActivePatientCount(doctorId) {
        const query = `
            SELECT COUNT(id) as count 
            FROM PatientProfiles 
            WHERE primary_doctor_id = $1;
        `;
        const { rows } = await db.query(query, [doctorId]);
        return parseInt(rows[0].count, 10) || 0;
    }

    static async getRecentPrescriptions(doctorId, limit = 3) {
        const query = `
            SELECT 
                pr.id, pr.medicine_name, pr.created_at,
                u.full_name as patient_name
            FROM Prescriptions pr
            JOIN Appointments a ON pr.appointment_id = a.id
            JOIN Users u ON a.patient_id = u.id
            WHERE a.doctor_id = $1
            ORDER BY pr.created_at DESC
            LIMIT $2;
        `;
        const { rows } = await db.query(query, [doctorId, limit]);
        return rows;
    }

    static async getRecentReviews(doctorId, limit = 1) {
        const query = `
            SELECT r.rating, r.review_text, u.full_name as patient_name
            FROM AppointmentReviews r
            JOIN Appointments a ON r.appointment_id = a.id
            JOIN Users u ON a.patient_id = u.id
            WHERE a.doctor_id = $1
            ORDER BY r.created_at DESC
            LIMIT $2;
        `;
        const { rows } = await db.query(query, [doctorId, limit]);
        return rows;
    }

    static async getPayoutStats(doctorId) {
        const balanceQuery = `
        SELECT (
            COALESCE((SELECT SUM(dp.consultation_fee) 
             FROM Appointments a 
             JOIN DoctorProfiles dp ON a.doctor_id = dp.id 
             WHERE a.doctor_id = $1 AND a.status = 'Completed'), 0) - 
            COALESCE((SELECT SUM(amount_due) FROM Payouts WHERE doctor_id = $1 AND status = 'Paid'), 0)
        ) as available_balance;
    `;

        const mtdQuery = `
        SELECT COALESCE(SUM(dp.consultation_fee), 0) as mtd_earned
        FROM Appointments a
        JOIN DoctorProfiles dp ON a.doctor_id = dp.id
        WHERE a.doctor_id = $1 
        AND a.status = 'Completed' 
        AND a.start_time >= date_trunc('month', CURRENT_DATE);
    `;

        const profileQuery = `
        SELECT average_rating, u.full_name 
        FROM DoctorProfiles dp
        JOIN Users u ON dp.user_id = u.id
        WHERE dp.id = $1;
    `;

        const [balanceRes, mtdRes, profileRes] = await Promise.all([
            db.query(balanceQuery, [doctorId]),
            db.query(mtdQuery, [doctorId]),
            db.query(profileQuery, [doctorId])
        ]);

        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        nextMonth.setDate(1);

        const formattedNextPayout = nextMonth.toLocaleDateString('en-US', {
            month: 'long',
            day: '2-digit',
            year: 'numeric'
        });

        return {
            availableBalance: parseFloat(balanceRes.rows[0].available_balance) || 0,
            totalEarned: parseFloat(mtdRes.rows[0].mtd_earned) || 0,
            nextPayoutDate: formattedNextPayout,
            averageRating: parseFloat(profileRes.rows[0]?.average_rating) || 0,
            doctorName: profileRes.rows[0]?.full_name || 'Doctor'
        };
    }

    static async getMonthlyEarnings(doctorId) {
        const query = `
        SELECT 
            to_char(date_trunc('month', a.start_time), 'Mon') as month_name,
            SUM(dp.consultation_fee) as revenue
        FROM Appointments a
        JOIN DoctorProfiles dp ON a.doctor_id = dp.id
        WHERE a.doctor_id = $1 AND a.status = 'Completed'
        AND a.start_time >= CURRENT_DATE - INTERVAL '6 months'
        GROUP BY date_trunc('month', a.start_time)
        ORDER BY date_trunc('month', a.start_time) ASC;
    `;
        const { rows } = await db.query(query, [doctorId]);
        return rows;
    }

    static async getRecentTransactions(doctorId, limit = 5) {
        const query = `
        SELECT 
            a.id, 
            a.start_time as date, 
            u.full_name as patient_name, 
            a.mode as service_type, 
            dp.consultation_fee as amount, 
            a.status
        FROM Appointments a
        JOIN PatientProfiles p ON a.patient_id = p.id
        JOIN Users u ON p.user_id = u.id
        JOIN DoctorProfiles dp ON a.doctor_id = dp.id
        WHERE a.doctor_id = $1
        ORDER BY a.start_time DESC
        LIMIT $2;
    `;
        const { rows } = await db.query(query, [doctorId, limit]);
        return rows;
    }
}

module.exports = DoctorModel;