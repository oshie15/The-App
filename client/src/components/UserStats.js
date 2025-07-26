import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { FaUsers, FaUserCheck, FaUserTimes } from 'react-icons/fa';

const UserStats = ({ users }) => {
    const totalUsers = users.length;
    const activeUsers = users.filter(user => user.status === 'active').length;
    const blockedUsers = users.filter(user => user.status === 'blocked').length;

    return (
        <Row className="mb-4">
            <Col md={4}>
                <Card className="text-center h-100">
                    <Card.Body>
                        <FaUsers className="text-primary mb-2" size={24} />
                        <Card.Title>{totalUsers}</Card.Title>
                        <Card.Text className="text-muted">Total Users</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
                <Card className="text-center h-100 border-success">
                    <Card.Body>
                        <FaUserCheck className="text-success mb-2" size={24} />
                        <Card.Title>{activeUsers}</Card.Title>
                        <Card.Text className="text-muted">Active Users</Card.Text>
                        <Badge bg="success" className="mt-2">
                            {totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0}%
                        </Badge>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
                <Card className="text-center h-100 border-danger">
                    <Card.Body>
                        <FaUserTimes className="text-danger mb-2" size={24} />
                        <Card.Title>{blockedUsers}</Card.Title>
                        <Card.Text className="text-muted">Blocked Users</Card.Text>
                        <Badge bg="danger" className="mt-2">
                            {totalUsers > 0 ? Math.round((blockedUsers / totalUsers) * 100) : 0}%
                        </Badge>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default UserStats; 