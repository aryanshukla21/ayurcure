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
              AND DATE(start_time) = CURRENT_DATE 
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
              AND start_time >= CURRENT_TIMESTAMP 
              AND status = 'Scheduled'
        `;
        const { rows } = await db.query(query, [doctorId]);
        return rows[0];
    },

    getRecentUpcomingAppointments: async (doctorId) => {
        const query = `
            SELECT 
                a.id, 
                u.full_name AS patient_name, 
                a.start_time AS appointment_date, 
                a.start_time AS appointment_time, 
                a.status,
                a.mode AS consultation_type 
            FROM Appointments a 
            JOIN PatientProfiles p ON a.patient_id = p.id 
            JOIN Users u ON p.user_id = u.id
            WHERE a.doctor_id = $1 
              AND a.start_time >= CURRENT_TIMESTAMP 
              AND a.status = 'Scheduled'
            ORDER BY a.start_time ASC 
            LIMIT 5
        `;
        const { rows } = await db.query(query, [doctorId]);
        return rows;
    },

    getEarningSummary: async (doctorId) => {
        const query = `
            SELECT 
                COALESCE(SUM(d.consultation_fee), 0) AS total_earnings, 
                COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM a.start_time) = EXTRACT(MONTH FROM CURRENT_DATE) THEN d.consultation_fee ELSE 0 END), 0) AS monthly_earnings 
            FROM Appointments a
            JOIN DoctorProfiles d ON a.doctor_id = d.id
            WHERE a.doctor_id = $1 AND a.status = 'Completed'
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
                dateFilter = 'AND DATE(a.start_time) = CURRENT_DATE';
                break;
            case 'Upcoming':
                dateFilter = 'AND a.start_time >= CURRENT_TIMESTAMP';
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
                break;
        }

        const query = `
            SELECT 
                a.id, 
                u.full_name AS patient_name, 
                p.gender,
                p.age,
                a.start_time AS appointment_date, 
                a.start_time AS appointment_time, 
                a.status, 
                a.mode AS consultation_type 
            FROM Appointments a 
            JOIN PatientProfiles p ON a.patient_id = p.id 
            JOIN Users u ON p.user_id = u.id
            WHERE a.doctor_id = $1 
            ${dateFilter} 
            ${statusFilter}
            ORDER BY a.start_time DESC
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
                u.full_name AS patient_name, 
                p.age, 
                p.gender, 
                p.blood_group, 
                u.phone AS contact_number,
                a.start_time AS appointment_date, 
                a.start_time AS appointment_time, 
                a.status, 
                a.mode AS consultation_type, 
                a.chief_complaint AS reason_for_visit 
            FROM Appointments a 
            JOIN PatientProfiles p ON a.patient_id = p.id 
            JOIN Users u ON p.user_id = u.id
            WHERE a.id = $1 AND a.doctor_id = $2
        `;
        const { rows } = await db.query(query, [appointmentId, doctorId]);
        return rows[0];
    },

    getApptSymptoms: async (doctorId, appointmentId) => {
        const query = `
            SELECT pre_consultation_symptoms, chief_complaint 
            FROM Appointments 
            WHERE id = $1 AND doctor_id = $2
        `;
        const { rows } = await db.query(query, [appointmentId, doctorId]);
        return rows[0];
    },

    getApptReports: async (doctorId, appointmentId) => {
        const query = `
            SELECT 
                pd.id, 
                pd.document_name, 
                pd.document_type, 
                pd.uploaded_at,
                pd.file_url
            FROM PatientDocuments pd
            JOIN Appointments a ON pd.patient_id = a.patient_id
            WHERE a.id = $1 AND a.doctor_id = $2
            ORDER BY pd.uploaded_at DESC
        `;
        const { rows } = await db.query(query, [appointmentId, doctorId]);
        return rows;
    },

    getApptMedicalInfo: async (doctorId, appointmentId) => {
        // Querying exactly what is available in the PatientProfiles table based on your schema
        const query = `
            SELECT 
                p.allergies, 
                p.medical_history AS chronic_conditions, 
                p.current_medications::text AS current_medications, 
                'None recorded' AS past_surgeries,
                'None recorded' AS family_medical_history
            FROM PatientProfiles p
            JOIN Appointments a ON p.id = a.patient_id
            WHERE a.id = $1 AND a.doctor_id = $2
        `;
        const { rows } = await db.query(query, [appointmentId, doctorId]);
        
        return rows[0] || {
            allergies: 'None recorded',
            chronic_conditions: 'None recorded',
            current_medications: 'None recorded',
            past_surgeries: 'None recorded',
            family_medical_history: 'None recorded'
        };
    },

    rescheduleAppointment: async (doctorId, appointmentId, date, time) => {
        const start_time = `${date} ${time}`; 
        const query = `
            UPDATE Appointments 
            SET start_time = $1::timestamp, 
                end_time = $1::timestamp + interval '30 minutes',
                status = 'Scheduled'
            WHERE id = $2 AND doctor_id = $3 
            RETURNING id, start_time AS appointment_date, start_time AS appointment_time, status
        `;
        const { rows } = await db.query(query, [start_time, appointmentId, doctorId]);
        return rows[0];
    },

    cancelAppointment: async (doctorId, appointmentId) => {
        const query = `
            UPDATE Appointments 
            SET status = 'Cancelled'
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
            SELECT COALESCE(SUM(d.consultation_fee), 0) AS total 
            FROM Appointments a
            JOIN DoctorProfiles d ON a.doctor_id = d.id
            WHERE a.doctor_id = $1 AND a.status = 'Completed'
        `;
        const { rows } = await db.query(query, [doctorId]);
        return parseFloat(rows[0].total);
    },

    getMonthlyEarning: async (doctorId) => {
        const query = `
            SELECT COALESCE(SUM(d.consultation_fee), 0) AS monthly 
            FROM Appointments a
            JOIN DoctorProfiles d ON a.doctor_id = d.id
            WHERE a.doctor_id = $1 
              AND a.status = 'Completed' 
              AND EXTRACT(MONTH FROM a.start_time) = EXTRACT(MONTH FROM CURRENT_DATE) 
              AND EXTRACT(YEAR FROM a.start_time) = EXTRACT(YEAR FROM CURRENT_DATE)
        `;
        const { rows } = await db.query(query, [doctorId]);
        return parseFloat(rows[0].monthly);
    },

    getEarningHistory: async (doctorId) => {
        const query = `
            SELECT 
                a.id, 
                a.start_time AS payment_date, 
                d.consultation_fee AS amount, 
                'Online' AS payment_method,
                u.full_name AS patient_name, 
                a.mode AS consultation_type 
            FROM Appointments a
            JOIN PatientProfiles p ON a.patient_id = p.id
            JOIN Users u ON p.user_id = u.id
            JOIN DoctorProfiles d ON a.doctor_id = d.id
            WHERE a.doctor_id = $1 AND a.status = 'Completed'
            ORDER BY a.start_time DESC
        `;
        const { rows } = await db.query(query, [doctorId]);
        return rows;
    },

    // ==========================================
    // PROFILE
    // ==========================================

    getProfilePersonalInfo: async (userId) => {
        // We select NULL for profile_image_url since it's not in the DB schema
        const query = `
            SELECT u.full_name, d.specialization, d.experience_years, d.bio, NULL AS profile_image_url 
            FROM DoctorProfiles d 
            JOIN Users u ON d.user_id = u.id 
            WHERE u.id = $1
        `;
        const { rows } = await db.query(query, [userId]);
        
        if (rows[0] && rows[0].full_name) {
            const names = rows[0].full_name.split(' ');
            rows[0].first_name = names[0];
            rows[0].last_name = names.slice(1).join(' ');
        }
        return rows[0];
    },

    getNextConsultation: async (doctorId) => {
        const query = `
            SELECT 
                a.start_time AS appointment_date, 
                a.start_time AS appointment_time, 
                u.full_name AS patient_name,
                a.mode AS consultation_type
            FROM Appointments a 
            JOIN PatientProfiles p ON a.patient_id = p.id 
            JOIN Users u ON p.user_id = u.id 
            WHERE a.doctor_id = $1 
              AND a.start_time >= CURRENT_TIMESTAMP 
              AND a.status = 'Scheduled' 
            ORDER BY a.start_time ASC 
            LIMIT 1
        `;
        const { rows } = await db.query(query, [doctorId]);
        return rows[0];
    },

    getContactInfo: async (userId) => {
        const query = `
            SELECT u.email, u.phone AS phone_number, d.location AS clinic_address 
            FROM DoctorProfiles d 
            JOIN Users u ON d.user_id = u.id 
            WHERE u.id = $1
        `;
        const { rows } = await db.query(query, [userId]);
        return rows[0];
    },

    getCredentials: async (userId) => {
        const query = `
            SELECT qualifications, registration_number AS medical_license_number, education_details::text AS achievements 
            FROM DoctorProfiles 
            WHERE user_id = $1
        `;
        const { rows } = await db.query(query, [userId]);
        return rows[0];
    },

    getPhilosophy: async (userId) => {
        const query = `
            SELECT philosophy_of_care 
            FROM DoctorProfiles 
            WHERE user_id = $1
        `;
        const { rows } = await db.query(query, [userId]);
        return rows[0];
    },

    // ==========================================
    // SETTINGS
    // ==========================================

    getSettingsPersonalInfo: async (userId) => {
        const query = `
            SELECT u.full_name, u.email, u.phone AS phone_number, NULL AS profile_image_url, d.bio 
            FROM DoctorProfiles d 
            JOIN Users u ON d.user_id = u.id 
            WHERE u.id = $1
        `;
        const { rows } = await db.query(query, [userId]);

        if (rows[0] && rows[0].full_name) {
            const names = rows[0].full_name.split(' ');
            rows[0].first_name = names[0];
            rows[0].last_name = names.slice(1).join(' ');
        }
        return rows[0];
    },

    updateSettingsPersonalInfo: async (userId, data) => {
        const client = await db.connect();
        try {
            await client.query('BEGIN');

            const fullName = `${data.first_name || ''} ${data.last_name || ''}`.trim();

            // Note: Cannot update avatar because it doesn't exist in the schema
            const profileQuery = `
                UPDATE DoctorProfiles 
                SET bio = COALESCE($1, bio)
                WHERE user_id = $2
            `;
            await client.query(profileQuery, [data.bio, userId]);

            const userQuery = `
                UPDATE Users 
                SET email = COALESCE($1, email), 
                    phone = COALESCE($2, phone),
                    full_name = COALESCE(NULLIF($3, ''), full_name)
                WHERE id = $4
            `;
            await client.query(userQuery, [data.email, data.phone_number, fullName, userId]);

            await client.query('COMMIT');
            return true;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    },

    getPreferences: async (userId) => {
        const query = `SELECT preferences FROM DoctorProfiles WHERE user_id = $1`;
        const { rows } = await db.query(query, [userId]);
        return rows[0]?.preferences || {};
    },

    updatePreferences: async (userId, preferences) => {
        const query = `
            UPDATE DoctorProfiles 
            SET preferences = $1 
            WHERE user_id = $2 
            RETURNING preferences
        `;
        const { rows } = await db.query(query, [JSON.stringify(preferences), userId]);
        return rows[0];
    },

    getProfessionalCredentials: async (userId) => {
        const query = `
            SELECT specialization, experience_years, qualifications, registration_number AS medical_license_number 
            FROM DoctorProfiles 
            WHERE user_id = $1
        `;
        const { rows } = await db.query(query, [userId]);
        return rows[0];
    },

    updateProfessionalCredentials: async (userId, data) => {
        const query = `
            UPDATE DoctorProfiles 
            SET specialization = COALESCE($1, specialization), 
                experience_years = COALESCE($2, experience_years), 
                qualifications = COALESCE($3, qualifications),
                registration_number = COALESCE($4, registration_number)
            WHERE user_id = $5
        `;
        await db.query(query, [data.specialization, data.experience_years, data.qualifications, data.medical_license_number, userId]);
        return true;
    },

    getConsultationLogistics: async (userId) => {
        const query = `
            SELECT consultation_fee, availability_summary AS availability_schedule, location AS clinic_address 
            FROM DoctorProfiles 
            WHERE user_id = $1
        `;
        const { rows } = await db.query(query, [userId]);
        return rows[0];
    },

    updateConsultationLogistics: async (userId, data) => {
        const query = `
            UPDATE DoctorProfiles 
            SET consultation_fee = COALESCE($1, consultation_fee),
                availability_summary = COALESCE($2, availability_summary),
                location = COALESCE($3, location)
            WHERE user_id = $4
        `;
        // Pass objects as JSON string if they are arrays/objects from frontend
        const schedule = typeof data.availability_schedule === 'object' ? JSON.stringify(data.availability_schedule) : data.availability_schedule;
        
        await db.query(query, [data.consultation_fee, schedule, data.clinic_address, userId]);
        return true;
    },

    getPhilosophyOfCare: async (userId) => {
        const query = `SELECT philosophy_of_care FROM DoctorProfiles WHERE user_id = $1`;
        const { rows } = await db.query(query, [userId]);
        return rows[0];
    },

    updatePhilosophyOfCare: async (userId, philosophy) => {
        const query = `
            UPDATE DoctorProfiles 
            SET philosophy_of_care = $1 
            WHERE user_id = $2
        `;
        await db.query(query, [philosophy, userId]);
        return true;
    }
};

module.exports = doctorModel;