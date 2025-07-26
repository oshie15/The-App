# Quick Start Guide

Get the User Management Application running in minutes!

## Option 1: Quick Setup (Recommended)

1. **Run the setup script:**

   ```bash
   npm run setup
   ```

2. **Set up PostgreSQL database:**

   - Install PostgreSQL if you haven't already
   - Create a database: `CREATE DATABASE user_management_db;`
   - Update credentials in `server/config.env`

3. **Start the application:**

   ```bash
   npm run dev
   ```

4. **Access the app:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Option 2: Docker Setup (Easiest)

1. **Start with Docker Compose:**

   ```bash
   npm run docker-up
   ```

2. **Access the app:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Option 3: Manual Setup

1. **Install dependencies:**

   ```bash
   npm run install-all
   ```

2. **Configure database:**

   - Update `server/config.env` with your PostgreSQL credentials

3. **Start the application:**
   ```bash
   npm run dev
   ```

## Testing the Application

1. **Register a new user:**

   - Go to http://localhost:3000/register
   - Create an account with any email and password

2. **Login:**

   - Use your credentials to sign in

3. **User Management:**
   - View the user table
   - Try sorting by clicking column headers
   - Use the filter to search users
   - Select users with checkboxes
   - Test the toolbar actions (Block, Unblock, Delete)

## Default Test Data

The application includes sample users for testing:

- Clare, Alex (a_clare42@gmail.com) - Active
- Morrison, Jim (dmtimer9@dealyaari.com) - Active
- Simone, Nina (marishabelin@giftcode-ao.com) - Blocked
- Zappa, Frank (zappa_f@citybank.com) - Active

## Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running
- Check credentials in `server/config.env`
- Verify database `user_management_db` exists

### Port Already in Use

- Change ports in `server/config.env` and `client/package.json`
- Or stop other services using ports 3000/5000

### Docker Issues

- Ensure Docker and Docker Compose are installed
- Try rebuilding: `npm run docker-build`

## Support

For detailed documentation, see [README.md](README.md)
