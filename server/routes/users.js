const express = require('express');
const { pool, updateLastActivity } = require('../database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all users with sorting (requirement 3)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const { sortBy = 'last_login_time', sortOrder = 'desc', filter = '', statusFilter = 'all' } = req.query;

        // Update user's last activity
        await updateLastActivity(req.user.id);

        let query = `
      SELECT id, name, email, status, registration_time, last_login_time, last_activity_time
      FROM users
    `;

        const params = [];
        let paramIndex = 1;

        // Build WHERE clause
        const conditions = [];

        // Add filter if provided
        if (filter) {
            conditions.push(`(name ILIKE $${paramIndex} OR email ILIKE $${paramIndex})`);
            params.push(`%${filter}%`);
            paramIndex++;
        }

        // Add status filter if provided
        if (statusFilter && statusFilter !== 'all') {
            conditions.push(`status = $${paramIndex}`);
            params.push(statusFilter);
            paramIndex++;
        }

        // Add WHERE clause if conditions exist
        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
        }

        // Add sorting (requirement 3)
        const allowedSortFields = ['name', 'email', 'last_login_time', 'last_activity_time', 'registration_time'];
        const allowedSortOrders = ['asc', 'desc'];

        if (allowedSortFields.includes(sortBy) && allowedSortOrders.includes(sortOrder.toLowerCase())) {
            query += ` ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`;
        } else {
            query += ` ORDER BY last_login_time DESC`;
        }

        const result = await pool.query(query, params);

        res.json({
            users: result.rows,
            total: result.rows.length
        });

    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Block users (bulk action)
router.patch('/block', authenticateToken, async (req, res) => {
    try {
        const { userIds } = req.body;

        if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ message: 'User IDs array is required' });
        }

        // Update user's last activity
        await updateLastActivity(req.user.id);

        const result = await pool.query(
            'UPDATE users SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = ANY($2) RETURNING id, name, email, status',
            ['blocked', userIds]
        );

        res.json({
            message: `${result.rows.length} user(s) blocked successfully`,
            updatedUsers: result.rows
        });

    } catch (error) {
        console.error('Error blocking users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Unblock users (bulk action)
router.patch('/unblock', authenticateToken, async (req, res) => {
    try {
        const { userIds } = req.body;

        if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ message: 'User IDs array is required' });
        }

        // Update user's last activity
        await updateLastActivity(req.user.id);

        const result = await pool.query(
            'UPDATE users SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = ANY($2) RETURNING id, name, email, status',
            ['active', userIds]
        );

        res.json({
            message: `${result.rows.length} user(s) unblocked successfully`,
            updatedUsers: result.rows
        });

    } catch (error) {
        console.error('Error unblocking users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete users (bulk action)
router.delete('/', authenticateToken, async (req, res) => {
    try {
        const { userIds } = req.body;

        if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ message: 'User IDs array is required' });
        }

        // Update user's last activity
        await updateLastActivity(req.user.id);

        const result = await pool.query(
            'DELETE FROM users WHERE id = ANY($1) RETURNING id, name, email',
            [userIds]
        );

        res.json({
            message: `${result.rows.length} user(s) deleted successfully`,
            deletedUsers: result.rows
        });

    } catch (error) {
        console.error('Error deleting users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router; 