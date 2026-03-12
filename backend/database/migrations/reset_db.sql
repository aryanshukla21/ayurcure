-- ==========================================
-- 0. CLEAN SLATE (Drops existing data & tables)
-- ==========================================
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";