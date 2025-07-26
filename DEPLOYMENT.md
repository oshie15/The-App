# 🚀 Deployment Guide

## Backend Deployment to Render

### 1. **Prepare Your Repository**

- Push your code to GitHub
- Make sure the `server/` folder contains all backend files

### 2. **Deploy to Render**

1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `user-management-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or choose paid for better performance)

### 3. **Environment Variables**

Add these environment variables in Render dashboard:

```
NODE_ENV=production
PORT=10000
DB_HOST=your-postgres-host
DB_PORT=5432
DB_NAME=your-database-name
DB_USER=your-database-user
DB_PASSWORD=your-database-password
JWT_SECRET=your-super-secret-jwt-key
```

### 4. **Database Setup**

- Create a PostgreSQL database (Render provides this)
- Or use external PostgreSQL (AWS RDS, Supabase, etc.)
- Update the database environment variables

### 5. **Update CORS**

In `server/index.js`, update the CORS origin to your Netlify domain:

```javascript
origin: process.env.NODE_ENV === "production"
	? ["https://your-app-name.netlify.app"]
	: ["http://localhost:3000"];
```

---

## Frontend Deployment to Netlify

### 1. **Prepare Your Repository**

- Make sure the `client/` folder contains all frontend files
- Update `client/src/config.js` with your Render backend URL

### 2. **Deploy to Netlify**

1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure the build settings:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `build`

### 3. **Environment Variables**

Add this environment variable in Netlify dashboard:

```
REACT_APP_API_URL=https://your-backend-name.onrender.com
```

### 4. **Update Config**

In `client/src/config.js`, update the production API URL:

```javascript
production: {
	apiUrl: process.env.REACT_APP_API_URL ||
		"https://your-backend-name.onrender.com";
}
```

---

## 🎯 **Quick Deployment Steps**

### **Backend (Render)**

1. Push code to GitHub
2. Create new Web Service on Render
3. Set root directory to `server`
4. Add environment variables
5. Deploy and get your backend URL

### **Frontend (Netlify)**

1. Update `client/src/config.js` with your Render backend URL
2. Create new site on Netlify from Git
3. Set base directory to `client`
4. Add `REACT_APP_API_URL` environment variable
5. Deploy and get your frontend URL

### **Final Steps**

1. Update CORS in backend with your Netlify domain
2. Test the full application
3. Share your live URLs! 🎉

---

## 🔧 **Troubleshooting**

### **Common Issues:**

- **CORS errors**: Make sure CORS origin matches your Netlify domain exactly
- **Database connection**: Verify all database environment variables are set
- **Build failures**: Check Node.js version compatibility
- **API 404**: Ensure all API routes are working locally first

### **Useful Commands:**

```bash
# Test backend locally
cd server && npm start

# Test frontend locally
cd client && npm start

# Build frontend locally
cd client && npm run build
```

---

## 📝 **Environment Variables Summary**

### **Render (Backend)**

```
NODE_ENV=production
PORT=10000
DB_HOST=your-postgres-host
DB_PORT=5432
DB_NAME=your-database-name
DB_USER=your-database-user
DB_PASSWORD=your-database-password
JWT_SECRET=your-super-secret-jwt-key
```

### **Netlify (Frontend)**

```
REACT_APP_API_URL=https://your-backend-name.onrender.com
```

---

**Your application will be live at:**

- **Frontend**: `https://your-app-name.netlify.app`
- **Backend**: `https://your-backend-name.onrender.com`
