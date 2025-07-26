import React, { useState } from 'react';
import { Table, Button, Form, InputGroup, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaLock, FaUnlock, FaTrash, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { toast } from 'react-toastify';

const UserTable = ({ users, setUsers, fetchUsers, loading }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState('last_login_time');
    const [sortOrder, setSortOrder] = useState('desc');

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedUsers(users.map(user => user.id));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectUser = (userId) => {
        setSelectedUsers(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const handleBlock = async () => {
        if (selectedUsers.length === 0) {
            toast.warning('⚠️ Please select one or more users to block');
            return;
        }

        try {
            const response = await axios.patch(`${API_BASE_URL}/api/users/block`, { userIds: selectedUsers });
            toast.success(`Successfully blocked ${response.data.updatedUsers.length} user(s)`);
            setSelectedUsers([]);
            await fetchUsers();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to block users. Please try again.';
            toast.error(errorMessage);
        }
    };

    const handleUnblock = async () => {
        if (selectedUsers.length === 0) {
            toast.warning('⚠️ Please select one or more users to unblock');
            return;
        }

        try {
            const response = await axios.patch(`${API_BASE_URL}/api/users/unblock`, { userIds: selectedUsers });
            toast.success(`Successfully unblocked ${response.data.updatedUsers.length} user(s)`);
            setSelectedUsers([]);
            await fetchUsers();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to unblock users. Please try again.';
            toast.error(errorMessage);
        }
    };

    const handleDelete = async () => {
        if (selectedUsers.length === 0) {
            toast.warning('⚠️ Please select one or more users to delete');
            return;
        }

        const confirmMessage = selectedUsers.length === 1
            ? 'Are you sure you want to delete this user? This action cannot be undone.'
            : `Are you sure you want to delete ${selectedUsers.length} users? This action cannot be undone.`;

        if (window.confirm(confirmMessage)) {
            try {
                const response = await axios.delete(`${API_BASE_URL}/api/users`, { data: { userIds: selectedUsers } });
                toast.success(`Successfully deleted ${response.data.deletedUsers.length} user(s)`);
                setSelectedUsers([]);
                await fetchUsers();
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Failed to delete users. Please try again.';
                toast.error(errorMessage);
            }
        }
    };

    const formatTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));

        if (diffInMinutes < 1) return 'less than a minute ago';
        if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;

        const diffInWeeks = Math.floor(diffInDays / 7);
        return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    };

    const getSortIcon = (field) => {
        if (sortBy !== field) return <FaSort className="text-muted" />;
        return sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />;
    };

    return (
        <div className="user-table">
            {/* Toolbar */}
            <div className="toolbar">
                {selectedUsers.length > 0 && (
                    <div className="text-muted small mb-3 text-center">
                        <strong>{selectedUsers.length}</strong> user{selectedUsers.length !== 1 ? 's' : ''} selected
                    </div>
                )}
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-2 flex-wrap">
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Block selected users from accessing the system</Tooltip>}
                        >
                            <Button
                                variant="primary"
                                onClick={handleBlock}
                                disabled={selectedUsers.length === 0}
                                className="d-flex align-items-center"
                            >
                                <FaLock className="me-1" />
                                <span className="d-none d-sm-inline">Block</span>
                            </Button>
                        </OverlayTrigger>

                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Unblock selected users to restore access</Tooltip>}
                        >
                            <Button
                                variant="outline-secondary"
                                onClick={handleUnblock}
                                disabled={selectedUsers.length === 0}
                            >
                                <FaUnlock />
                            </Button>
                        </OverlayTrigger>

                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Permanently delete selected users (cannot be undone)</Tooltip>}
                        >
                            <Button
                                variant="outline-danger"
                                onClick={handleDelete}
                                disabled={selectedUsers.length === 0}
                            >
                                <FaTrash />
                            </Button>
                        </OverlayTrigger>
                    </div>

                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Search users by name or email address</Tooltip>}
                    >
                        <InputGroup className="flex-grow-1 ms-3" style={{ maxWidth: '300px' }}>
                            <Form.Control
                                type="text"
                                placeholder="Filter by name or email"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                        </InputGroup>
                    </OverlayTrigger>
                </div>
            </div>

            {/* Table */}
            <Table responsive hover className="mb-0 table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '50px' }}>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Select or deselect all users</Tooltip>}
                            >
                                <Form.Check
                                    type="checkbox"
                                    checked={selectedUsers.length === users.length && users.length > 0}
                                    onChange={handleSelectAll}
                                />
                            </OverlayTrigger>
                        </th>
                        <th
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleSort('name')}
                        >
                            <div className="d-flex align-items-center">
                                Name {getSortIcon('name')}
                            </div>
                        </th>
                        <th
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleSort('email')}
                        >
                            <div className="d-flex align-items-center">
                                Email {getSortIcon('email')}
                            </div>
                        </th>
                        <th>Status</th>
                        <th
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleSort('registration_time')}
                        >
                            <div className="d-flex align-items-center">
                                Registration {getSortIcon('registration_time')}
                            </div>
                        </th>
                        <th
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleSort('last_login_time')}
                        >
                            <div className="d-flex align-items-center">
                                Last seen {getSortIcon('last_login_time')}
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4">
                                Loading...
                            </td>
                        </tr>
                    ) : users.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4">
                                No users found
                            </td>
                        </tr>
                    ) : (
                        users.map(user => (
                            <tr
                                key={user.id}
                            >
                                <td>
                                    <Form.Check
                                        type="checkbox"
                                        checked={selectedUsers.includes(user.id)}
                                        onChange={() => handleSelectUser(user.id)}
                                    />
                                </td>
                                <td>
                                    <div>
                                        <div className="fw-medium">{user.name}</div>
                                        <div className="text-muted small">N/A</div>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip>
                                                {user.status === 'active'
                                                    ? 'User has full access to the system'
                                                    : 'User is blocked and cannot access the system'
                                                }
                                            </Tooltip>
                                        }
                                    >
                                        <Badge
                                            bg={user.status === 'blocked' ? 'danger' : 'success'}
                                            className="status-badge"
                                        >
                                            {user.status}
                                        </Badge>
                                    </OverlayTrigger>
                                </td>
                                <td>
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip>
                                                {new Date(user.registration_time).toLocaleString()}
                                            </Tooltip>
                                        }
                                    >
                                        <div>
                                            <div>{formatTimeAgo(user.registration_time)}</div>
                                        </div>
                                    </OverlayTrigger>
                                </td>
                                <td>
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip>
                                                {new Date(user.last_login_time).toLocaleString()}
                                            </Tooltip>
                                        }
                                    >
                                        <div>
                                            <div>{formatTimeAgo(user.last_login_time)}</div>
                                            <div className="sparkline mt-1"></div>
                                        </div>
                                    </OverlayTrigger>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default UserTable; 