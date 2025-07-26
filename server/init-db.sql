-- Initialize User Management Database
-- Run this script to set up the database schema

-- Create users table
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

-- Create unique index on email (requirement 1, 15)
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_unique ON users (email);

-- Insert sample data for testing
INSERT INTO users (name, email, password, status) VALUES
    ('Clare, Alex', 'a_clare42@gmail.com', '$2a$10$hashedpassword', 'active'),
    ('Morrison, Jim', 'dmtimer9@dealyaari.com', '$2a$10$hashedpassword', 'active'),
    ('Simone, Nina', 'marishabelin@giftcode-ao.com', '$2a$10$hashedpassword', 'blocked'),
    ('Zappa, Frank', 'zappa_f@citybank.com', '$2a$10$hashedpassword', 'active')
ON CONFLICT (email) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_status ON users (status);
CREATE INDEX IF NOT EXISTS idx_users_last_login ON users (last_login_time);
CREATE INDEX IF NOT EXISTS idx_users_last_activity ON users (last_activity_time); 