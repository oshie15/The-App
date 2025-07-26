const config = {
    development: {
        apiUrl: 'http://localhost:5000'
    },
    production: {
        apiUrl: process.env.REACT_APP_API_URL || 'https://your-backend-name.onrender.com'
    }
};

const environment = process.env.NODE_ENV || 'development';
export const API_BASE_URL = config[environment].apiUrl; 