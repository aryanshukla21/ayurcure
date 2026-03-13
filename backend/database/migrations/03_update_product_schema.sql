-- ==========================================
-- ALTER Products TABLE for Catalog Data
-- ==========================================
ALTER TABLE Products
    -- Identification & Pricing
    ADD COLUMN IF NOT EXISTS sku VARCHAR(100) UNIQUE,
    ADD COLUMN IF NOT EXISTS form VARCHAR(100), -- e.g., 'Hard Gelatin Capsules'
    ADD COLUMN IF NOT EXISTS quantity_size VARCHAR(100), -- e.g., '60 Capsules', '200g'
    ADD COLUMN IF NOT EXISTS mrp DECIMAL(10, 2),
    ADD COLUMN IF NOT EXISTS gst_percent DECIMAL(5, 2),
    ADD COLUMN IF NOT EXISTS hsn_code VARCHAR(50),
    
    -- Compliance & Logistics
    ADD COLUMN IF NOT EXISTS shelf_life VARCHAR(100),
    ADD COLUMN IF NOT EXISTS storage_instructions TEXT,
    ADD COLUMN IF NOT EXISTS origin VARCHAR(255),
    
    -- Marketing & Discovery
    ADD COLUMN IF NOT EXISTS target_audience VARCHAR(255),
    ADD COLUMN IF NOT EXISTS tags TEXT[], -- Array of strings for tags
    ADD COLUMN IF NOT EXISTS description TEXT,
    
    -- Clinical & Ayurvedic Details
    ADD COLUMN IF NOT EXISTS key_ingredients TEXT[], -- Array of strings
    ADD COLUMN IF NOT EXISTS therapeutic_indications TEXT[], -- Array of strings
    ADD COLUMN IF NOT EXISTS dosage_administration TEXT,
    ADD COLUMN IF NOT EXISTS contraindications TEXT;