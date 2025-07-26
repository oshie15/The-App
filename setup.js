#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up User Management Application...\n');

// Check if Node.js is installed
try {
    const nodeVersion = execSync('node --version', { encoding: 'utf8' });
    console.log(`✅ Node.js version: ${nodeVersion.trim()}`);
} catch (error) {
    console.error('❌ Node.js is not installed. Please install Node.js first.');
    process.exit(1);
}

// Check if npm is installed
try {
    const npmVersion = execSync('npm --version', { encoding: 'utf8' });
    console.log(`✅ npm version: ${npmVersion.trim()}`);
} catch (error) {
    console.error('❌ npm is not installed. Please install npm first.');
    process.exit(1);
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
    console.log('Installing root dependencies...');
    execSync('npm install', { stdio: 'inherit' });

    console.log('Installing server dependencies...');
    execSync('cd server && npm install', { stdio: 'inherit' });

    console.log('Installing client dependencies...');
    execSync('cd client && npm install', { stdio: 'inherit' });

    console.log('✅ All dependencies installed successfully!');
} catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
}

// Create config file if it doesn't exist
const configPath = path.join(__dirname, 'server', 'config.env');
if (!fs.existsSync(configPath)) {
    console.log('\n⚙️  Creating configuration file...');
    const configContent = `PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=user_management_db
DB_USER=postgres
DB_PASSWORD=password
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=development`;

    fs.writeFileSync(configPath, configContent);
    console.log('✅ Configuration file created at server/config.env');
    console.log('⚠️  Please update the database credentials in server/config.env');
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Set up PostgreSQL database');
console.log('2. Update database credentials in server/config.env');
console.log('3. Run the application: npm run dev');
console.log('4. Access the app at: http://localhost:3000');
console.log('\n📖 For detailed instructions, see README.md'); 