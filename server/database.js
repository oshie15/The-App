const { Pool } = require('pg');
require('dotenv').config({ path: './config.env' });

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Initialize database with tables and unique index
const initializeDatabase = async () => {
    try {
        // Create users table with unique index on email
        await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'blocked')),
        registration_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_activity_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Create unique index on email (requirement 1, 15)
        await pool.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_unique 
      ON users (email);
    `);

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
};

// Update last activity time
const updateLastActivity = async (userId) => {
    try {
        await pool.query(
            'UPDATE users SET last_activity_time = CURRENT_TIMESTAMP WHERE id = $1',
            [userId]
        );
    } catch (error) {
        console.error('Error updating last activity:', error);
    }
};

// Update last login time
const updateLastLogin = async (userId) => {
    try {
        await pool.query(
            'UPDATE users SET last_login_time = CURRENT_TIMESTAMP, last_activity_time = CURRENT_TIMESTAMP WHERE id = $1',
            [userId]
        );
    } catch (error) {
        console.error('Error updating last login:', error);
    }
};

module.exports = {
    pool,
    initializeDatabase,
    updateLastActivity,
    updateLastLogin
}; 