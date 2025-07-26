import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validation
        if (!formData.name || !formData.email || !formData.password) {
            setError('⚠️ All fields are required');
            setLoading(false);
            return;
        }

        if (formData.name.trim().length < 2) {
            setError('⚠️ Name must be at least 2 characters long');
            setLoading(false);
            return;
        }

        if (!formData.email.includes('@') || !formData.email.includes('.')) {
            setError('⚠️ Please enter a valid email address');
            setLoading(false);
            return;
        }

        if (formData.password.length < 1) {
            setError('⚠️ Password must be at least 1 character long');
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('⚠️ Passwords do not match. Please try again.');
            setLoading(false);
            return;
        }

        const result = await register(formData.name, formData.email, formData.password);

        if (result.success) {
            toast.success('Registration successful! Welcome to the system.');
            navigate('/dashboard');
        } else {
            setError(result.message);
            toast.error(result.message);
        }

        setLoading(false);
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="text-center mb-4">
                    <h1 className="navbar-brand mb-2">THE APP</h1>
                    <p className="text-muted mb-1">Start your journey</p>
                    <h2 className="h4 fw-bold text-dark">Create Account</h2>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            required
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-100 mb-3"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>

                    <div className="text-center">
                        <span className="text-muted">Already have an account? </span>
                        <Link to="/login" className="text-decoration-none">Sign in</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Register; 