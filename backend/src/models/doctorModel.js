const db = require('../config/db');

const doctorModel = {

    createProfile: async (data) => {
        const query = `
            INSERT INTO DoctorProfiles (user_id, verification_status) 
            VALUES ($1, 'Pending') 
            RETURNING id;
        `;
        const { rows } = await db.query(query, [data.user_id]);
        return rows[0];
    },

    // ==========================================
    // DASHBOARD
    // ==========================================

    getTotalPatients: async (doctorId) => {
        const query = `
            SELECT COUNT(DISTINCT patient_id) AS "totalPatients" 
            FROM Appointments 
            WHERE doctor_id = $1 AND status != 'Cancelled'
        `;
        const { rows } = await db.query(query, [doctorId]);
        return rows[0];
    },

    getAppointmentsToday: async (doctorId) => {
        const query = `
            SELECT COUNT(*) AS "appointmentsToday" 
            FROM Appointments 
            WHERE doctor_id = $1 
              AND DATE(appointment_date) = CURRENT_DATE 
              AND status NOT IN ('Cancelled', 'Completed')
        `;
        const { rows } = await db.query(query, [doctorId]);
        return rows[0];
    },

    getUpcomingConsultations: async (doctorId) => {
        const query = `
            SELECT COUNT(*) AS "upcomingConsultations" 
            FROM Appointments 
            WHERE doctor_id = $1 
              AND appointment_date >= CURRENT_DATE 
              AND status = 'Scheduled'
        `;
        const { rows } = await db.query(query, [doctorId]);
        return rows[0];
    },

    getRecentUpcomingAppointments: async (doctorId) => {
        const query = `
            SELECT 
                a.id, 
                p.name AS patient_name, 
                a.appointment_date, 
                a.appointment_time, 
                a.status,
                a.consultation_type 
            FROM Appointments a 
            JOIN Patients p ON a.patient_id = p.id 
            WHERE a.doctor_id = $1 
              AND a.appointment_date >= CURRENT_DATE 
              AND a.status = 'Scheduled'
            ORDER BY a.appointment_date ASC, a.appointment_time ASC 
            LIMIT 5
        `;
        const { rows } = await db.query(query, [doctorId]);
        return rows;
    },

    getEarningSummary: async (doctorId) => {
        const query = `
            SELECT 
                COALESCE(SUM(amount), 0) AS total_earnings, 
                COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM payment_date) = EXTRACT(MONTH FROM CURRENT_DATE) THEN amount ELSE 0 END), 0) AS monthly_earnings 
            FROM Payments 
            WHERE doctor_id = $1 AND status = 'Completed'
        `;
        const { rows } = await db.query(query, [doctorId]);
        return {
            total: parseFloat(rows[0].total_earnings),
            monthly: parseFloat(rows[0].monthly_earnings)
        };
    },

    // ==========================================
    // APPOINTMENTS
    // ==========================================

    getAppointmentsList: async (doctorId, filterType) => {
        let statusFilter = '';
        let dateFilter = '';

        switch (filterType) {
            case 'Today':
                dateFilter = 'AND DATE(a.appointment_date) = CURRENT_DATE';
                break;
            case 'Upcoming':
                dateFilter = 'AND a.appointment_date >= CURRENT_DATE';
                statusFilter = "AND a.status = 'Scheduled'";
                break;
            case 'Completed':
                statusFilter = "AND a.status = 'Completed'";
                break;
            case 'Cancelled':
                statusFilter = "AND a.status = 'Cancelled'";
                break;
            case 'All':
            default:
                // No filters, get all
                break;
        }

        const query = `
            SELECT 
                a.id, 
                p.name AS patient_name, 
                p.gender,
                p.age,
                a.appointment_date, 
                a.appointment_time, 
                a.status, 
                a.consultation_type 
            FROM Appointments a 
            JOIN Patients p ON a.patient_id = p.id 
            WHERE a.doctor_id = $1 
            ${dateFilter} 
            ${statusFilter}
            ORDER BY a.appointment_date DESC, a.appointment_time DESC
        `;
        const { rows } = await db.query(query, [doctorId]);
        return rows;
    },

    // ==========================================
    // APPOINTMENT DETAILS
    // ==========================================

    getApptPatientInfo: async (doctorId, appointmentId) => {
        const query = `
            SELECT 
                a.id, 
                p.id AS patient_id, 
                p.name AS patient_name, 
                p.age, 
                p.gender, 
                p.blood_group, 
                p.contact_number,
                a.appointment_date, 
                a.appointment_time, 
                a.status, 
                a.consultation_type, 
                a.reason_for_visit 
            FROM Appointments a 
            JOIN Patients p ON a.patient_id = p.id 
            WHERE a.id = $1 AND a.doctor_id = $2
        `;
        const { rows } = await db.query(query, [appointmentId, doctorId]);
        return rows[0];
    },

    getApptSymptoms: async (doctorId, appointmentId) => {
        const query = `
            SELECT pre_consultation_symptoms 
            FROM Appointments 
            WHERE id = $1 AND doctor_id = $2
        `;
        const { rows } = await db.query(query, [appointmentId, doctorId]);
        return rows[0];
    },

    getApptReports: async (doctorId, appointmentId) => {
        const query = `
            SELECT 
                pr.id, 
                pr.document_name, 
                pr.document_type, 
                pr.uploaded_at,
                pr.file_url
            FROM PatientReports pr
            JOIN Appointments a ON pr.patient_id = a.patient_id
            WHERE a.id = $1 AND a.doctor_id = $2
            ORDER BY pr.uploaded_at DESC
        `;
        const { rows } = await db.query(query, [appointmentId, doctorId]);
        return rows;
    },

    getApptMedicalInfo: async (doctorId, appointmentId) => {
        const query = `
            SELECT 
                pmh.allergies, 
                pmh.chronic_conditions, 
                pmh.current_medications, 
                pmh.past_surgeries,
                pmh.family_medical_history
            FROM PatientMedicalHistory pmh
            JOIN Appointments a ON pmh.patient_id = a.patient_id
            WHERE a.id = $1 AND a.doctor_id = $2
        `;
        const { rows } = await db.query(query, [appointmentId, doctorId]);
        return rows[0];
    },

    rescheduleAppointment: async (doctorId, appointmentId, date, time) => {
        const query = `
            UPDATE Appointments 
            SET appointment_date = $1, appointment_time = $2, status = 'Scheduled', updated_at = CURRENT_TIMESTAMP
            WHERE id = $3 AND doctor_id = $4 
            RETURNING id, appointment_date, appointment_time, status
        `;
        const { rows } = await db.query(query, [date, time, appointmentId, doctorId]);
        return rows[0];
    },

    cancelAppointment: async (doctorId, appointmentId) => {
        const query = `
            UPDATE Appointments 
            SET status = 'Cancelled', updated_at = CURRENT_TIMESTAMP
            WHERE id = $1 AND doctor_id = $2 
            RETURNING id, status
        `;
        const { rows } = await db.query(query, [appointmentId, doctorId]);
        return rows[0];
    },

    // ==========================================
    // EARNINGS
    // ==========================================

    getTotalEarnings: async (doctorId) => {
        const query = `
            SELECT COALESCE(SUM(amount), 0) AS total 
            FROM Payments 
            WHERE doctor_id = $1 AND status = 'Completed'
        `;
        const { rows } = await db.query(query, [doctorId]);
        return parseFloat(rows[0].total);
    },

    getMonthlyEarning: async (doctorId) => {
        const query = `
            SELECT COALESCE(SUM(amount), 0) AS monthly 
            FROM Payments 
            WHERE doctor_id = $1 
              AND status = 'Completed' 
              AND EXTRACT(MONTH FROM payment_date) = EXTRACT(MONTH FROM CURRENT_DATE) 
              AND EXTRACT(YEAR FROM payment_date) = EXTRACT(YEAR FROM CURRENT_DATE)
        `;
        const { rows } = await db.query(query, [doctorId]);
        return parseFloat(rows[0].monthly);
    },

    getEarningHistory: async (doctorId) => {
        const query = `
            SELECT 
                p.id, 
                p.payment_date, 
                p.amount, 
                p.payment_method,
                pt.name AS patient_name, 
                a.consultation_type 
            FROM Payments p
            JOIN Appointments a ON p.appointment_id = a.id
            JOIN Patients pt ON a.patient_id = pt.id
            WHERE p.doctor_id = $1 AND p.status = 'Completed'
            ORDER BY p.payment_date DESC
        `;
        const { rows } = await db.query(query, [doctorId]);
        return rows;
    },

    // ==========================================
    // PROFILE
    // ==========================================

    getProfilePersonalInfo: async (doctorId) => {
        const query = `
            SELECT first_name, last_name, specialization, experience_years, bio, profile_image_url 
            FROM DoctorProfiles 
            WHERE user_id = $1
        `;
        const { rows } = await db.query(query, [doctorId]);
        return rows[0];
    },

    getNextConsultation: async (doctorId) => {
        const query = `
            SELECT 
                a.appointment_date, 
                a.appointment_time, 
                p.name AS patient_name,
                a.consultation_type
            FROM Appointments a 
            JOIN Patients p ON a.patient_id = p.id 
            WHERE a.doctor_id = $1 
              AND a.appointment_date >= CURRENT_DATE 
              AND a.status = 'Scheduled' 
            ORDER BY a.appointment_date ASC, a.appointment_time ASC 
            LIMIT 1
        `;
        const { rows } = await db.query(query, [doctorId]);
        return rows[0];
    },

    getContactInfo: async (doctorId) => {
        const query = `
            SELECT u.email, dp.phone_number, dp.clinic_address 
            FROM DoctorProfiles dp 
            JOIN Users u ON dp.user_id = u.id 
            WHERE u.id = $1
        `;
        const { rows } = await db.query(query, [doctorId]);
        return rows[0];
    },

    getCredentials: async (doctorId) => {
        const query = `
            SELECT qualifications, medical_license_number, achievements 
            FROM DoctorProfiles 
            WHERE user_id = $1
        `;
        const { rows } = await db.query(query, [doctorId]);
        return rows[0];
    },

    getPhilosophy: async (doctorId) => {
        const query = `
            SELECT philosophy_of_care 
            FROM DoctorProfiles 
            WHERE user_id = $1
        `;
        const { rows } = await db.query(query, [doctorId]);
        return rows[0];
    },

    // ==========================================
    // SETTINGS
    // ==========================================

    getSettingsPersonalInfo: async (doctorId) => {
        const query = `
            SELECT dp.first_name, dp.last_name, u.email, dp.phone_number, dp.profile_image_url, dp.bio 
            FROM DoctorProfiles dp 
            JOIN Users u ON dp.user_id = u.id 
            WHERE u.id = $1
        `;
        const { rows } = await db.query(query, [doctorId]);
        return rows[0];
    },

    updateSettingsPersonalInfo: async (doctorId, data) => {
        // Run in transaction to update both Users and DoctorProfiles tables
        const client = await db.connect();
        try {
            await client.query('BEGIN');

            const profileQuery = `
                UPDATE DoctorProfiles 
                SET first_name = $1, last_name = $2, phone_number = $3, bio = $4
                WHERE user_id = $5
            `;
            await client.query(profileQuery, [data.first_name, data.last_name, data.phone_number, data.bio, doctorId]);

            const userQuery = `
                UPDATE Users 
                SET email = $1 
                WHERE id = $2
            `;
            await client.query(userQuery, [data.email, doctorId]);

            await client.query('COMMIT');
            return true;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    },

    getPreferences: async (doctorId) => {
        const query = `SELECT preferences FROM DoctorProfiles WHERE user_id = $1`;
        const { rows } = await db.query(query, [doctorId]);
        return rows[0]?.preferences || {};
    },

    updatePreferences: async (doctorId, preferences) => {
        const query = `
            UPDATE DoctorProfiles 
            SET preferences = $1 
            WHERE user_id = $2 
            RETURNING preferences
        `;
        const { rows } = await db.query(query, [JSON.stringify(preferences), doctorId]);
        return rows[0];
    },

    getProfessionalCredentials: async (doctorId) => {
        const query = `
            SELECT specialization, experience_years, qualifications, medical_license_number 
            FROM DoctorProfiles 
            WHERE user_id = $1
        `;
        const { rows } = await db.query(query, [doctorId]);
        return rows[0];
    },

    updateProfessionalCredentials: async (doctorId, data) => {
        const query = `
            UPDATE DoctorProfiles 
            SET specialization = $1, experience_years = $2, qualifications = $3, medical_license_number = $4 
            WHERE user_id = $5
        `;
        await db.query(query, [data.specialization, data.experience_years, data.qualifications, data.medical_license_number, doctorId]);
        return true;
    },

    getConsultationLogistics: async (doctorId) => {
        const query = `
            SELECT consultation_fee, availability_schedule, clinic_address 
            FROM DoctorProfiles 
            WHERE user_id = $1
        `;
        const { rows } = await db.query(query, [doctorId]);
        return rows[0];
    },

    updateConsultationLogistics: async (doctorId, data) => {
        const query = `
            UPDATE DoctorProfiles 
            SET consultation_fee = $1, availability_schedule = $2, clinic_address = $3 
            WHERE user_id = $4
        `;
        await db.query(query, [data.consultation_fee, JSON.stringify(data.availability_schedule), data.clinic_address, doctorId]);
        return true;
    },

    getPhilosophyOfCare: async (doctorId) => {
        const query = `SELECT philosophy_of_care FROM DoctorProfiles WHERE user_id = $1`;
        const { rows } = await db.query(query, [doctorId]);
        return rows[0];
    },

    updatePhilosophyOfCare: async (doctorId, philosophy) => {
        const query = `
            UPDATE DoctorProfiles 
            SET philosophy_of_care = $1 
            WHERE user_id = $2
        `;
        await db.query(query, [philosophy, doctorId]);
        return true;
    }
};

module.exports = doctorModel;