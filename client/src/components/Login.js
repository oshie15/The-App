import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const [formData, setFormData] = useState({
        email: 'test@example.com',
        password: '••••••••',
        rememberMe: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formData.email || !formData.password) {
            setError('⚠️ Email and password are required');
            setLoading(false);
            return;
        }

        if (!formData.email.includes('@')) {
            setError('⚠️ Please enter a valid email address');
            setLoading(false);
            return;
        }

        const result = await login(formData.email, formData.password);

        if (result.success) {
            toast.success('Login successful! Welcome back.');
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
                    <h1 className="navbar-brand mb-3">THE APP</h1>
                    <p className="text-muted mb-2">Enterprise User Management</p>
                    <h2 className="h4 fw-bold text-dark">Sign In to Your Account</h2>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label">E-mail Address</Form.Label>
                        <div className="position-relative">
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email address"
                                required
                                autoComplete="email"
                            />
                            <div className="position-absolute top-50 end-0 translate-middle-y pe-3">
                                <i className="bi bi-envelope text-muted"></i>
                            </div>
                        </div>
                        <Form.Text className="text-muted">
                            Enter the email address you used during registration
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="form-label">Password</Form.Label>
                        <div className="position-relative">
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                autoComplete="current-password"
                            />
                            <div className="position-absolute top-50 end-0 translate-middle-y pe-3">
                                <i className="bi bi-eye text-muted"></i>
                            </div>
                        </div>
                        <Form.Text className="text-muted">
                            Enter your account password
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Check
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            label="Remember me"
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-100 mb-3"
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </Button>

                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <span className="text-muted">Don't have an account? </span>
                            <Link to="/register" className="text-decoration-none">Sign up</Link>
                        </div>
                        <Link to="/forgot-password" className="text-decoration-none">Forgot password?</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login; 