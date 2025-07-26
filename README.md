# User Management Application

A full-stack web application built with React.js, Node.js, and PostgreSQL for user management with authentication and admin functionality.

## Features

- ✅ User registration and authentication
- ✅ JWT-based authentication with middleware protection
- ✅ User management table with sorting and filtering
- ✅ Multiple selection with checkboxes (select all/deselect all)
- ✅ Bulk actions: Block, Unblock, Delete users
- ✅ Responsive design with Bootstrap
- ✅ Tooltips and status messages
- ✅ PostgreSQL database with unique index on email
- ✅ Server-side authentication checks
- ✅ Error handling and validation

## Requirements Met

1. ✅ **Unique Index**: Created unique index on email field in PostgreSQL
2. ✅ **Table Design**: Proper table structure with toolbar
3. ✅ **Data Sorting**: Sortable by name, email, last login time
4. ✅ **Multiple Selection**: Checkboxes with select all functionality
5. ✅ **Authentication Middleware**: Server checks user existence and block status
6. ✅ **Working Application**: Complete full-stack implementation
7. ✅ **Access Control**: Non-authenticated users redirected to login
8. ✅ **User Management**: Table with required fields and optional sparklines
9. ✅ **Checkbox Column**: Leftmost column with checkboxes only
10. ✅ **Toolbar Actions**: Block (text), Unblock (icon), Delete (icon)
11. ✅ **Bootstrap**: Used throughout the application
12. ✅ **Password Validation**: Any non-empty password accepted
13. ✅ **Blocked User Login**: Blocked users cannot login
14. ✅ **Unique Index**: Database-level email uniqueness
15. ✅ **Storage Guarantee**: PostgreSQL unique index ensures email uniqueness
16. ✅ **Primary Key**: Separate from unique index
17. ✅ **Relational Database**: PostgreSQL with proper schema
18. ✅ **Clean UI**: No wallpapers, animations, or browser alerts
19. ✅ **Responsive**: Works on desktop and mobile
20. ✅ **Libraries**: Uses established libraries for all functionality
21. ✅ **Error Messages**: Proper error handling and user feedback
22. ✅ **Toolbar Design**: Matches the provided screenshot
23. ✅ **Login Form**: Matches the provided design
24. ✅ **Admin Functionality**: All users are admins for testing

## Tech Stack

### Backend

- **Node.js** with Express.js
- **PostgreSQL** database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** and security middleware

### Frontend

- **React.js** with hooks
- **React Router** for navigation
- **Bootstrap 5** for styling
- **React Bootstrap** components
- **Axios** for API calls
- **React Toastify** for notifications

## Database Schema

```sql
CREATE TABLE users (
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

CREATE UNIQUE INDEX idx_users_email_unique ON users (email);
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Clone the repository

```bash
git clone <repository-url>
cd user-management-app
```

### 2. Install dependencies

```bash
npm run install-all
```

### 3. Database Setup

1. Create a PostgreSQL database:

```sql
CREATE DATABASE user_management_db;
```

2. Update database configuration in `server/config.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=user_management_db
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your-super-secret-jwt-key
```

### 4. Start the application

#### Development mode (both frontend and backend):

```bash
npm run dev
```

#### Or start separately:

```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

### 5. Access the application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### User Management (Protected)

- `GET /api/users` - Get all users with sorting/filtering
- `PATCH /api/users/block` - Block selected users
- `PATCH /api/users/unblock` - Unblock selected users
- `DELETE /api/users` - Delete selected users

## Usage

1. **Registration**: Create a new account with any email and password
2. **Login**: Sign in with your credentials
3. **User Management**:
   - View all users in the table
   - Sort by clicking column headers
   - Filter users using the search box
   - Select users with checkboxes
   - Use toolbar actions (Block, Unblock, Delete)
4. **Logout**: Click logout in the navigation

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Server-side user validation on every request
- CORS protection
- Rate limiting
- Helmet security headers
- Unique email constraint at database level

## Project Structure

```
user-management-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # Authentication context
│   │   └── App.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication middleware
│   ├── database.js        # Database connection
│   ├── index.js           # Server entry point
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## Deployment

### Backend Deployment

1. Set environment variables for production
2. Build and deploy to your preferred platform (Heroku, AWS, etc.)
3. Update CORS origins in `server/index.js`

### Frontend Deployment

1. Update API base URL in production
2. Build the React app: `npm run build`
3. Deploy the build folder to your hosting platform

## Testing

The application includes:

- Form validation
- Error handling
- User feedback with toast notifications
- Responsive design testing
- Cross-browser compatibility

## License

MIT License
