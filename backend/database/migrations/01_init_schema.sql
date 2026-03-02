-- Enable UUID extension if on an older Postgres version (13+ has gen_random_uuid() natively)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- 1. ENUM DEFINITIONS
-- ==========================================
[cite_start]CREATE TYPE user_role AS ENUM ('patient', 'doctor', 'admin')[cite: 135];
[cite_start]CREATE TYPE auth_provider_type AS ENUM ('local', 'google', 'apple')[cite: 138];
[cite_start]CREATE TYPE account_status_type AS ENUM ('Active', 'Deactivated', 'Banned')[cite: 144];
[cite_start]CREATE TYPE prakriti_enum AS ENUM ('Vata', 'Pitta', 'Kapha')[cite: 161];
[cite_start]CREATE TYPE record_enum AS ENUM ('Prescription', 'Lab Report')[cite: 186];
[cite_start]CREATE TYPE verification_enum AS ENUM ('Pending', 'Verified', 'Active')[cite: 199];
[cite_start]CREATE TYPE appointment_mode AS ENUM ('Video', 'Audio', 'Chat')[cite: 229];
[cite_start]CREATE TYPE appointment_status AS ENUM ('Scheduled', 'Completed', 'Cancelled')[cite: 230];
[cite_start]CREATE TYPE discount_enum AS ENUM ('Percentage', 'Flat')[cite: 294];
[cite_start]CREATE TYPE payout_status_enum AS ENUM ('Pending', 'Processing', 'Paid')[cite: 306];
[cite_start]CREATE TYPE banner_type AS ENUM ('App Banner', 'Push Notification')[cite: 317];
[cite_start]CREATE TYPE banner_status AS ENUM ('Draft', 'Active', 'Archived')[cite: 317];
[cite_start]CREATE TYPE article_status AS ENUM ('Pending Review', 'Published')[cite: 215];

-- ==========================================
-- 2. CORE AUTHENTICATION
-- ==========================================
CREATE TABLE Users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    [cite_start]role user_role NOT NULL[cite: 135],
    [cite_start]full_name VARCHAR(255) NOT NULL[cite: 136],
    [cite_start]email VARCHAR(255) UNIQUE NOT NULL[cite: 137],
    [cite_start]phone VARCHAR(20) UNIQUE[cite: 137],
    [cite_start]auth_provider auth_provider_type[cite: 138],
    [cite_start]password_hash VARCHAR(255)[cite: 139],
    [cite_start]otp_hash VARCHAR(255)[cite: 140],
    [cite_start]otp_expires_at TIMESTAMP[cite: 141],
    [cite_start]is_email_verified BOOLEAN DEFAULT false[cite: 142],
    [cite_start]is_phone_verified BOOLEAN DEFAULT false[cite: 143],
    [cite_start]account_status account_status_type DEFAULT 'Active'[cite: 144, 145],
    [cite_start]ban_reason TEXT[cite: 146],
    [cite_start]created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP [cite: 147]
);

-- ==========================================
-- 3. PATIENT MODULE
-- ==========================================
CREATE TABLE PatientProfiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    [cite_start]user_id UUID UNIQUE NOT NULL REFERENCES Users(id) ON DELETE CASCADE[cite: 156],
    [cite_start]age INT[cite: 158],
    [cite_start]gender VARCHAR(50)[cite: 159],
    [cite_start]health_history TEXT[cite: 160],
    [cite_start]prakriti_type prakriti_enum[cite: 161],
    [cite_start]prakriti_report_url VARCHAR(500)[cite: 161],
    [cite_start]referral_code VARCHAR(50) UNIQUE[cite: 162],
    [cite_start]wallet_credits DECIMAL(10, 2) DEFAULT 0.00 [cite: 163]
);

CREATE TABLE WellnessPlans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID UNIQUE NOT NULL REFERENCES PatientProfiles(id) ON DELETE CASCADE,
    [cite_start]dinacharya_routine TEXT[cite: 165],
    [cite_start]diet_chart TEXT[cite: 166],
    [cite_start]yoga_schedule TEXT[cite: 167],
    [cite_start]generated_at TIMESTAMP [cite: 168]
);

CREATE TABLE HealthLogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    [cite_start]patient_id UUID NOT NULL REFERENCES PatientProfiles(id) ON DELETE CASCADE[cite: 173],
    [cite_start]log_date DATE[cite: 178],
    [cite_start]sleep_hours DECIMAL(4, 2)[cite: 179],
    [cite_start]water_intake DECIMAL(5, 2)[cite: 180],
    [cite_start]stress_level VARCHAR(50)[cite: 181],
    [cite_start]symptoms TEXT [cite: 182]
);

CREATE TABLE MedicalRecords (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    [cite_start]patient_id UUID NOT NULL REFERENCES PatientProfiles(id) ON DELETE CASCADE[cite: 185],
    [cite_start]record_type record_enum[cite: 186],
    [cite_start]file_url VARCHAR(500) NOT NULL[cite: 187],
    [cite_start]uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP [cite: 189]
);

-- ==========================================
-- 4. DOCTOR MODULE
-- ==========================================
CREATE TABLE DoctorProfiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    [cite_start]user_id UUID UNIQUE NOT NULL REFERENCES Users(id) ON DELETE CASCADE[cite: 194],
    [cite_start]qualifications VARCHAR(255)[cite: 195],
    [cite_start]registration_number VARCHAR(100) UNIQUE[cite: 196],
    [cite_start]specialization VARCHAR(100)[cite: 197],
    [cite_start]experience_years INT[cite: 198],
    [cite_start]verification_status verification_enum DEFAULT 'Pending'[cite: 199],
    [cite_start]consultation_fee DECIMAL(10, 2)[cite: 201],
    [cite_start]total_earnings DECIMAL(12, 2) DEFAULT 0.00[cite: 202],
    [cite_start]admin_comments TEXT[cite: 203],
    [cite_start]verified_by_admin_id UUID REFERENCES Users(id) ON DELETE SET NULL [cite: 204]
);

CREATE TABLE DoctorAvailabilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doctor_id UUID NOT NULL REFERENCES DoctorProfiles(id) ON DELETE CASCADE,
    [cite_start]day_of_week VARCHAR(20) NOT NULL[cite: 206],
    [cite_start]start_time TIME NOT NULL[cite: 207],
    [cite_start]end_time TIME NOT NULL[cite: 208],
    [cite_start]is_booked BOOLEAN DEFAULT false [cite: 209]
);

CREATE TABLE Articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    [cite_start]doctor_id UUID NOT NULL REFERENCES DoctorProfiles(id) ON DELETE CASCADE[cite: 213],
    [cite_start]title VARCHAR(255) NOT NULL[cite: 213],
    [cite_start]content TEXT NOT NULL[cite: 214],
    [cite_start]status article_status DEFAULT 'Pending Review' [cite: 215]
);

-- ==========================================
-- 5. APPOINTMENT MODULE
-- ==========================================
CREATE TABLE Appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    [cite_start]patient_id UUID NOT NULL REFERENCES PatientProfiles(id) ON DELETE CASCADE[cite: 225],
    [cite_start]doctor_id UUID NOT NULL REFERENCES DoctorProfiles(id) ON DELETE CASCADE[cite: 227],
    [cite_start]scheduled_at TIMESTAMP NOT NULL[cite: 228],
    [cite_start]mode appointment_mode NOT NULL[cite: 229],
    [cite_start]status appointment_status DEFAULT 'Scheduled'[cite: 230],
    [cite_start]pre_consultation_symptoms TEXT[cite: 230],
    [cite_start]chief_complaint TEXT [cite: 231]
);

CREATE TABLE Prescriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID UNIQUE NOT NULL REFERENCES Appointments(id) ON DELETE CASCADE,
    [cite_start]herbs_prescribed TEXT[cite: 233],
    [cite_start]dosage TEXT[cite: 234],
    [cite_start]duration VARCHAR(100)[cite: 235],
    [cite_start]lifestyle_advice TEXT[cite: 236],
    [cite_start]created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP [cite: 237]
);

CREATE TABLE AppointmentReviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID UNIQUE NOT NULL REFERENCES Appointments(id) ON DELETE CASCADE,
    [cite_start]rating INT CHECK (rating >= 1 AND rating <= 5)[cite: 240],
    [cite_start]review_text TEXT[cite: 241],
    [cite_start]created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP [cite: 242]
);

-- ==========================================
-- 6. E-COMMERCE MODULE
-- ==========================================
CREATE TABLE Products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    [cite_start]name VARCHAR(255) NOT NULL[cite: 251],
    [cite_start]category VARCHAR(100)[cite: 251],
    [cite_start]brand VARCHAR(100)[cite: 252],
    [cite_start]ingredients TEXT[cite: 253],
    [cite_start]benefits TEXT[cite: 254],
    [cite_start]usage_instructions TEXT[cite: 255],
    [cite_start]certifications VARCHAR(255)[cite: 256],
    [cite_start]prakriti_suitability VARCHAR(100)[cite: 257],
    [cite_start]price DECIMAL(10, 2) NOT NULL[cite: 257],
    [cite_start]stock_quantity INT NOT NULL DEFAULT 0 [cite: 258]
);

CREATE TABLE Wishlists (
    patient_id UUID NOT NULL REFERENCES PatientProfiles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES Products(id) ON DELETE CASCADE,
    PRIMARY KEY (patient_id, product_id)
);

CREATE TABLE Orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    [cite_start]patient_id UUID NOT NULL REFERENCES PatientProfiles(id) ON DELETE CASCADE[cite: 263],
    [cite_start]total_amount DECIMAL(10, 2) NOT NULL[cite: 270],
    [cite_start]discount_applied DECIMAL(10, 2) DEFAULT 0.00[cite: 271],
    [cite_start]shipping_address TEXT NOT NULL[cite: 272],
    [cite_start]payment_method VARCHAR(50)[cite: 273],
    [cite_start]payment_status VARCHAR(50)[cite: 274],
    [cite_start]order_status VARCHAR(50)[cite: 275],
    [cite_start]delivery_eta TIMESTAMP[cite: 276],
    [cite_start]created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP [cite: 277]
);

CREATE TABLE OrderItems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES Orders(id) ON DELETE CASCADE,
    [cite_start]product_id UUID NOT NULL REFERENCES Products(id) ON DELETE RESTRICT[cite: 265],
    [cite_start]quantity INT NOT NULL[cite: 267],
    [cite_start]price_at_purchase DECIMAL(10, 2) NOT NULL [cite: 268]
);

CREATE TABLE Subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    [cite_start]patient_id UUID NOT NULL REFERENCES PatientProfiles(id) ON DELETE CASCADE[cite: 284],
    [cite_start]product_id UUID NOT NULL REFERENCES Products(id) ON DELETE CASCADE[cite: 286],
    [cite_start]frequency VARCHAR(50) NOT NULL[cite: 286],
    [cite_start]next_billing_date DATE[cite: 287],
    [cite_start]status VARCHAR(50) [cite: 289]
);

CREATE TABLE Coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    [cite_start]code VARCHAR(50) UNIQUE NOT NULL[cite: 293],
    [cite_start]discount_value DECIMAL(10, 2) NOT NULL[cite: 293],
    [cite_start]discount_type discount_enum NOT NULL[cite: 294],
    [cite_start]expiry_date TIMESTAMP [cite: 294]
);

-- ==========================================
-- 7. ADMIN MODULE
-- ==========================================
CREATE TABLE Payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    [cite_start]doctor_id UUID NOT NULL REFERENCES DoctorProfiles(id) ON DELETE RESTRICT[cite: 301],
    [cite_start]processed_by_admin_id UUID REFERENCES Users(id) ON DELETE SET NULL[cite: 301],
    [cite_start]period_start DATE[cite: 302],
    [cite_start]period_end DATE[cite: 303],
    [cite_start]total_consultations INT[cite: 304],
    [cite_start]amount_due DECIMAL(10, 2)[cite: 305],
    [cite_start]status payout_status_enum DEFAULT 'Pending'[cite: 306],
    [cite_start]transaction_reference VARCHAR(255)[cite: 306],
    [cite_start]created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP [cite: 307]
);

CREATE TABLE BannerCampaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    [cite_start]title VARCHAR(255) NOT NULL[cite: 313],
    [cite_start]image_url VARCHAR(500) NOT NULL[cite: 314],
    [cite_start]target_link VARCHAR(500)[cite: 315],
    [cite_start]type banner_type NOT NULL[cite: 317],
    [cite_start]status banner_status DEFAULT 'Draft'[cite: 317],
    [cite_start]start_date TIMESTAMP[cite: 317],
    [cite_start]end_date TIMESTAMP[cite: 318],
    [cite_start]created_by UUID NOT NULL REFERENCES Users(id) ON DELETE RESTRICT [cite: 319]
);

CREATE TABLE AdminActionLogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    [cite_start]admin_id UUID NOT NULL REFERENCES Users(id) ON DELETE RESTRICT[cite: 324],
    [cite_start]action_type VARCHAR(100) NOT NULL[cite: 324],
    [cite_start]target_entity_id UUID[cite: 325],
    [cite_start]details TEXT[cite: 325],
    [cite_start]timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP [cite: 326]
);