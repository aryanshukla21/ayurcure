const db = require('../config/db');

class AppointmentModel {
    // ==========================================
    // HELPER METHOD
    // ==========================================
    static async getPatientIdByUserId(userId) {
        const query = `SELECT id, prakriti_type FROM PatientProfiles WHERE user_id = $1;`;
        const { rows } = await db.query(query, [userId]);
        return rows[0];
    }

    // ==========================================
    // 1. APPOINTMENT LISTS
    // ==========================================

    // Base query snippet to avoid repetition
    static get baseListQuery() {
        return `
            SELECT 
                a.id, a.start_time, a.end_time, a.mode, a.status, 
                u.full_name AS doctor_name, d.specialization, d.average_rating
            FROM Appointments a
            JOIN DoctorProfiles d ON a.doctor_id = d.id
            JOIN Users u ON d.user_id = u.id
            WHERE a.patient_id = $1
        `;
    }

    static async getAll(patientId) {
        const query = `${this.baseListQuery} ORDER BY a.start_time DESC;`;
        const { rows } = await db.query(query, [patientId]);
        return rows;
    }

    static async getUpcoming(patientId) {
        const query = `
            ${this.baseListQuery} 
            AND a.status = 'Scheduled' 
            AND a.start_time > CURRENT_TIMESTAMP 
            ORDER BY a.start_time ASC;
        `;
        const { rows } = await db.query(query, [patientId]);
        return rows;
    }

    static async getCompleted(patientId) {
        const query = `
            ${this.baseListQuery} 
            AND a.status = 'Completed' 
            ORDER BY a.start_time DESC;
        `;
        const { rows } = await db.query(query, [patientId]);
        return rows;
    }

    static async getCancelled(patientId) {
        const query = `
            ${this.baseListQuery} 
            AND a.status = 'Cancelled' 
            ORDER BY a.start_time DESC;
        `;
        const { rows } = await db.query(query, [patientId]);
        return rows;
    }

    static async getThisMonth(patientId) {
        const query = `
            ${this.baseListQuery} 
            AND date_trunc('month', a.start_time) = date_trunc('month', CURRENT_DATE)
            ORDER BY a.start_time ASC;
        `;
        const { rows } = await db.query(query, [patientId]);
        return rows;
    }

    static async filterByDoctor(patientId, docName) {
        const query = `
            ${this.baseListQuery} 
            AND u.full_name ILIKE $2
            ORDER BY a.start_time DESC;
        `;
        const { rows } = await db.query(query, [patientId, `%${docName}%`]);
        return rows;
    }

    static async getAyurvedicInsight(patientId) {
        // Fetch the patient's prakriti to give a targeted insight
        const query = `SELECT prakriti_type FROM PatientProfiles WHERE id = $1;`;
        const { rows } = await db.query(query, [patientId]);
        const prakriti = rows[0]?.prakriti_type || 'Vata';

        // Mocking insight response based on DB state
        return {
            insight_title: `Understanding your ${prakriti} Dosha`,
            description: `Regular consultations help keep your ${prakriti} dosha in balance. Make sure to discuss your recent diet changes in your next visit.`
        };
    }

    static async getPrepInstructions(patientId) {
        return [
            "Keep your previous medical reports handy.",
            "Avoid eating heavy meals 2 hours prior to Nadi Pariksha.",
            "Write down any new symptoms you've experienced."
        ];
    }

    // ==========================================
    // 2. APPOINTMENT DETAILS (:id)
    // ==========================================

    static async getActions(appointmentId, patientId) {
        const query = `
            SELECT id, status, mode, meet_link, start_time 
            FROM Appointments 
            WHERE id = $1 AND patient_id = $2;
        `;
        const { rows } = await db.query(query, [appointmentId, patientId]);
        return rows[0];
    }

    static async getSymptoms(appointmentId, patientId) {
        const query = `
            SELECT pre_consultation_symptoms, chief_complaint 
            FROM Appointments 
            WHERE id = $1 AND patient_id = $2;
        `;
        const { rows } = await db.query(query, [appointmentId, patientId]);
        return rows[0];
    }

    static async getPractitionerInfo(appointmentId, patientId) {
        const query = `
            SELECT 
                u.full_name AS doctor_name, u.email, u.phone,
                d.specialization, d.experience_years, d.qualifications, d.bio
            FROM Appointments a
            JOIN DoctorProfiles d ON a.doctor_id = d.id
            JOIN Users u ON d.user_id = u.id
            WHERE a.id = $1 AND a.patient_id = $2;
        `;
        const { rows } = await db.query(query, [appointmentId, patientId]);
        return rows[0];
    }

    static async getDocuments(appointmentId, patientId) {
        // Assuming documents uploaded recently near the appointment time
        const query = `
            SELECT id, document_name, document_type, uploaded_at, file_url
            FROM PatientDocuments 
            WHERE patient_id = $1
            ORDER BY uploaded_at DESC LIMIT 5;
        `;
        const { rows } = await db.query(query, [patientId]);
        return rows;
    }

    static async getDocumentById(docId, patientId) {
        const query = `
            SELECT file_url, document_name 
            FROM PatientDocuments 
            WHERE id = $1 AND patient_id = $2;
        `;
        const { rows } = await db.query(query, [docId, patientId]);
        return rows[0];
    }

    // ==========================================
    // 3. BOOK APPOINTMENT
    // ==========================================

    static async createAppointment(data) {
        const { patientId, doctorId, slotId, reason } = data;

        // Obtain a dedicated client from the pool to run a Transaction
        const client = await db.connect();

        try {
            // Start the SQL Transaction
            await client.query('BEGIN');

            // 1. Mark the specific DoctorSlot as booked
            const updateSlotQuery = `
                UPDATE DoctorSlots 
                SET is_booked = true 
                WHERE id = $1 AND doctor_id = $2 AND is_booked = false
                RETURNING id, start_time, end_time;
            `;
            const slotRes = await client.query(updateSlotQuery, [slotId, doctorId]);

            // Concurrency defense: If 0 rows returned, it was already booked
            if (slotRes.rows.length === 0) {
                throw new Error('This specific time slot is no longer available. Please select another time.');
            }

            const finalStartTime = slotRes.rows[0].start_time;
            const finalEndTime = slotRes.rows[0].end_time;

            // 2. Insert the new Appointment into the database
            // FIXED: Changed 'video' to 'Video' to match the PostgreSQL ENUM exactly
            const insertQuery = `
                INSERT INTO Appointments (patient_id, doctor_id, slot_id, start_time, end_time, mode, status, pre_consultation_symptoms)
                VALUES ($1, $2, $3, $4, $5, 'Video', 'Scheduled', $6)
                RETURNING id, start_time;
            `;

            const result = await client.query(insertQuery, [
                patientId,
                doctorId,
                slotId,           // Good practice to store the slot_id reference too
                finalStartTime,
                finalEndTime,
                reason || ''
            ]);

            // If we made it here without errors, COMMIT both queries permanently
            await client.query('COMMIT');

            return result.rows[0];

        } catch (error) {
            // If ANYTHING fails (like an ENUM error), undo the slot update
            await client.query('ROLLBACK');
            throw error; // Pass error back to the controller
        } finally {
            // Always return the client to the pool to prevent memory leaks
            client.release();
        }
    }

    static async getAllPractitioners() {
        const query = `
            SELECT 
                d.id AS doctor_id, u.full_name, d.specialization, 
                d.experience_years, d.consultation_fee, d.average_rating, d.languages
            FROM DoctorProfiles d
            JOIN Users u ON d.user_id = u.id
            WHERE u.account_status = 'Active'
            ORDER BY d.average_rating DESC;
        `;
        const { rows } = await db.query(query);
        return rows;
    }

    static async filterPractitioners(filters) {
        let query = `
            SELECT 
                d.id AS doctor_id, u.full_name, d.specialization, 
                d.experience_years, d.consultation_fee, d.average_rating, d.languages
            FROM DoctorProfiles d
            JOIN Users u ON d.user_id = u.id
            WHERE u.account_status = 'Active'
        `;
        const params = [];
        let pIndex = 1;

        if (filters.specialty) {
            query += ` AND d.specialization ILIKE $${pIndex++}`;
            params.push(`%${filters.specialty}%`);
        }

        query += ` ORDER BY d.average_rating DESC;`;
        const { rows } = await db.query(query, params);
        return rows;
    }

    static async searchPractitioners(docName) {
        const query = `
            SELECT 
                d.id AS doctor_id, u.full_name, d.specialization, 
                d.experience_years, d.consultation_fee, d.average_rating
            FROM DoctorProfiles d
            JOIN Users u ON d.user_id = u.id
            WHERE u.account_status = 'Active' AND u.full_name ILIKE $1
            ORDER BY u.full_name ASC;
        `;
        const { rows } = await db.query(query, [`%${docName}%`]);
        return rows;
    }

    static async selectPractitioner(docId) {
        const query = `
            SELECT 
                d.id AS doctor_id, u.full_name, d.specialization, d.experience_years, 
                d.consultation_fee, d.average_rating, d.total_reviews, d.bio, d.education_details
            FROM DoctorProfiles d
            JOIN Users u ON d.user_id = u.id
            WHERE d.id = $1;
        `;
        const { rows } = await db.query(query, [docId]);
        return rows[0];
    }

    static async getAvailableSlots(docId, date) {
        const query = `
            SELECT id AS slot_id, start_time, end_time 
            FROM DoctorSlots 
            WHERE doctor_id = $1 
              AND DATE(start_time) = $2 
              AND is_booked = false
            ORDER BY start_time ASC;
        `;
        const { rows } = await db.query(query, [docId, date]);
        return rows;
    }

    static async getPrakritiAnalysis(patientId) {
        const query = `
            SELECT prakriti_type, vikruti, dosha_balance 
            FROM PatientProfiles p
            LEFT JOIN HealthStats h ON p.id = h.patient_id
            WHERE p.id = $1
            ORDER BY h.created_at DESC LIMIT 1;
        `;
        const { rows } = await db.query(query, [patientId]);
        return rows[0];
    }

    // ==========================================
    // 4. PRESCRIPTIONS
    // ==========================================

    static async getAllPrescriptions(patientId) {
        const query = `
            SELECT 
                p.id AS prescription_id, p.medicine_name, p.dosage, p.timing, p.duration, p.created_at,
                u.full_name AS doctor_name, d.specialization,
                a.start_time AS appointment_date
            FROM Prescriptions p
            JOIN Appointments a ON p.appointment_id = a.id
            JOIN DoctorProfiles d ON a.doctor_id = d.id
            JOIN Users u ON d.user_id = u.id
            WHERE p.patient_id = $1
            ORDER BY p.created_at DESC;
        `;
        const { rows } = await db.query(query, [patientId]);
        return rows;
    }

    static async getPrescriptionForPdf(prescriptionId, patientId) {
        const query = `
            SELECT 
                p.*, a.start_time AS appointment_date,
                du.full_name AS doctor_name, d.specialization, d.registration_number,
                pu.full_name AS patient_name, pp.age, pp.gender
            FROM Prescriptions p
            JOIN Appointments a ON p.appointment_id = a.id
            JOIN DoctorProfiles d ON a.doctor_id = d.id
            JOIN Users du ON d.user_id = du.id
            JOIN PatientProfiles pp ON p.patient_id = pp.id
            JOIN Users pu ON pp.user_id = pu.id
            WHERE p.id = $1 AND p.patient_id = $2;
        `;
        const { rows } = await db.query(query, [prescriptionId, patientId]);
        return rows[0];
    }

    static async getAutomatedRefills(patientId) {
        // Fetch active prescriptions nearing end of duration
        const query = `
            SELECT id AS prescription_id, medicine_name, dosage, duration 
            FROM Prescriptions 
            WHERE patient_id = $1 AND is_active = true
            ORDER BY created_at DESC LIMIT 3;
        `;
        const { rows } = await db.query(query, [patientId]);
        return rows;
    }
}

module.exports = AppointmentModel;