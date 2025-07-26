const jwt = require('jsonwebtoken');
const { pool } = require('../database');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user exists and isn't blocked (requirement 5)
        const result = await pool.query(
            'SELECT id, name, email, status FROM users WHERE id = $1',
            [decoded.userId]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        const user = result.rows[0];

        if (user.status === 'blocked') {
            return res.status(403).json({ message: 'User account is blocked' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = { authenticateToken }; 