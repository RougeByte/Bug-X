import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Login = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const { login, isAuthenticated, error, clearErrors } = authContext;

    useEffect(() => {
        // This is the correct logic. When isAuthenticated becomes true, navigate.
        if (isAuthenticated) {
            navigate('/');
        }

        if (error) {
            console.error(error); // Show an alert here
            clearErrors();
        }
        // eslint-disable-next-line
    }, [isAuthenticated, error, navigate]);

    const [user, setUser] = useState({ email: '', password: '' });
    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        login({ email, password });
    };

    return (
        <div style={{ maxWidth: '500px', margin: 'auto' }}>
            <h2>// Account <span style={{ color: 'var(--light-color)' }}>Login</span></h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required />
                </div>
                <input type="submit" value="Login" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} />
            </form>
        </div>
    );
};

export default Login;