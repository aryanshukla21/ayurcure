require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('../src/config/db');

async function runMigrations() {
    try {
        const sqlFilePath = path.join(__dirname, 'migrations', '01_init_schema.sql');
        const sql = fs.readFileSync(sqlFilePath, 'utf8');

        console.log('Connecting to PostgreSQL and executing DDL schema...');
        await db.query(sql);
        console.log('Success: All tables and constraints have been created.');
    } catch (error) {
        console.error('Critical Failure during migration:', error);
    } finally {
        process.exit();
    }
}

runMigrations();