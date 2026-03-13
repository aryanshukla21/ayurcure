-- ==========================================
-- 1. UPDATE EXISTING ENUM (Prakriti)
-- ==========================================
ALTER TYPE prakriti_enum ADD VALUE IF NOT EXISTS 'Vata-Pitta';
ALTER TYPE prakriti_enum ADD VALUE IF NOT EXISTS 'Pitta-Vata';
ALTER TYPE prakriti_enum ADD VALUE IF NOT EXISTS 'Pitta-Kapha';
ALTER TYPE prakriti_enum ADD VALUE IF NOT EXISTS 'Kapha-Pitta';
ALTER TYPE prakriti_enum ADD VALUE IF NOT EXISTS 'Vata-Kapha';
ALTER TYPE prakriti_enum ADD VALUE IF NOT EXISTS 'Kapha-Vata';
ALTER TYPE prakriti_enum ADD VALUE IF NOT EXISTS 'Tridoshic';

-- ==========================================
-- 2. ALTER PatientProfiles TABLE
-- ==========================================
ALTER TABLE PatientProfiles
    -- Identification & Status
    ADD COLUMN IF NOT EXISTS patient_display_id VARCHAR(50) UNIQUE,
    ADD COLUMN IF NOT EXISTS clinical_status VARCHAR(100) DEFAULT 'Active',
    
    -- Demographics & Body Metrics
    ADD COLUMN IF NOT EXISTS dob DATE,
    ADD COLUMN IF NOT EXISTS blood_group VARCHAR(5),
    ADD COLUMN IF NOT EXISTS height_cm DECIMAL(5,2),
    ADD COLUMN IF NOT EXISTS weight_kg DECIMAL(5,2),
    ADD COLUMN IF NOT EXISTS bmi DECIMAL(4,1),
    
    -- Ayurvedic Profile additions
    ADD COLUMN IF NOT EXISTS vikruti VARCHAR(255),
    
    -- Lifestyle & Contact Supplements
    ADD COLUMN IF NOT EXISTS address TEXT,
    ADD COLUMN IF NOT EXISTS diet_preference VARCHAR(100),
    ADD COLUMN IF NOT EXISTS allergies TEXT,
    
    -- Emergency Contact
    ADD COLUMN IF NOT EXISTS emergency_contact_name VARCHAR(255),
    ADD COLUMN IF NOT EXISTS emergency_contact_relation VARCHAR(100),
    ADD COLUMN IF NOT EXISTS emergency_contact_phone VARCHAR(20),
    
    -- Clinical Summaries
    ADD COLUMN IF NOT EXISTS chief_complaints TEXT[],
    ADD COLUMN IF NOT EXISTS medical_history TEXT[],
    ADD COLUMN IF NOT EXISTS current_medications JSONB,
    ADD COLUMN IF NOT EXISTS lifestyle_profile TEXT,
    ADD COLUMN IF NOT EXISTS treatment_plan TEXT,
    ADD COLUMN IF NOT EXISTS doctor_notes TEXT,
    
    -- Doctor Assignment
    ADD COLUMN IF NOT EXISTS primary_doctor_id UUID REFERENCES DoctorProfiles(id) ON DELETE SET NULL;