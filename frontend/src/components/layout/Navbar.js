import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const { isAuthenticated, logout, user, loadUser } = authContext;

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);

    const onLogout = () => {
        logout();
        // After logging out, redirect to the public welcome page
        navigate('/welcome'); 
    };

    const authLinks = (
        <>
            <li>Hello, {user && user.username}</li>
            {/* 
                THIS IS THE NEWLY ADDED "HOME" LINK.
                It points to the root '/', which our App.js router knows 
                is the protected Home page for logged-in users.
            */}
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li>
                <a onClick={onLogout} href="#!">
                    Logout
                </a>
            </li>
        </>
    );

    const guestLinks = (
        <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </>
    );

    return (
        <nav style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '1rem', 
            background: 'var(--dark-color)', 
            borderBottom: '2px solid var(--primary-color)', 
            marginBottom: '1rem' 
        }}>
            <h1><Link to={isAuthenticated ? '/' : '/welcome'}>[ BugX ]</Link></h1>
            <ul style={{ display: 'flex', listStyle: 'none', alignItems: 'center', gap: '1rem' }}>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </nav>
    );
};

export default Navbar;