import React, { useState, useEffect, useCallback } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import UserTable from './UserTable';
import UserStats from './UserStats';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = useCallback(async (filter = '', sortBy = 'last_login_time', sortOrder = 'desc', statusFilter = 'all') => {
        try {
            setLoading(true);
            const params = {};
            if (filter) params.filter = filter;
            if (sortBy) params.sortBy = sortBy;
            if (sortOrder) params.sortOrder = sortOrder;
            if (statusFilter && statusFilter !== 'all') params.statusFilter = statusFilter;

            console.log('Fetching users with params:', params);
            const response = await axios.get(`${API_BASE_URL}/api/users`, { params });
            console.log('Users response:', response.data);
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleLogout = () => {
        logout();
    };

    return (
        <div>
            {/* Navigation Header */}
            <Navbar bg="white" expand="lg" className="shadow-sm">
                <Container>
                    <Navbar.Brand href="#home" className="navbar-brand">
                        THE APP
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link onClick={handleLogout} className="text-danger d-flex align-items-center">
                                <span className="me-1">Logout</span>
                                <i className="bi bi-box-arrow-right"></i>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Main Content */}
            <Container className="py-4">
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h1 className="h2 mb-2 fw-bold text-dark">User Management</h1>
                            <p className="text-muted mb-0">Manage users, block/unblock accounts, and view activity</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="text-muted me-2">Welcome,</span>
                            <span className="fw-semibold text-primary">{user?.name || 'Admin'}</span>
                        </div>
                    </div>
                </div>
                <UserStats users={users} />
                <UserTable users={users} setUsers={setUsers} fetchUsers={fetchUsers} loading={loading} />
            </Container>
        </div>
    );
};

export default Dashboard; 