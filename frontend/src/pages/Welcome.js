import React, { useContext, useEffect } from 'react';
// Combine the imports from 'react-router-dom' into one line
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';
import Spinner from '../components/layout/Spinner';

import './Welcome.css';

const Welcome = () => {
     const authContext = useContext(AuthContext);
    const { isAuthenticated, loading } = authContext;
    const navigate = useNavigate();

    

    return (
        <div className="welcome-container">
            <header className="welcome-header">
                <h1 className="glitch" data-text="[ BugX ]">[ BugX ]</h1>
                <p className="welcome-subtitle"> Your personal command center for bug bounty hunting.</p>
            </header>

            <main className="welcome-main">
                <div className="feature-grid">
                    <div className="feature-card">
                        <h3>// Track Everything</h3>
                        <p>Log reports from HackerOne, Bugcrowd, Intigriti, and private programs. Never lose track of a submission again.</p>
                    </div>
                    <div className="feature-card">
                        <h3>// See Your Stats</h3>
                        <p>Visualize your earnings, track submission statuses, and analyze your success across different platforms.</p>
                    </div>
                    <div className="feature-card">
                        <h3>// Secure & Private</h3>
                        <p>Your data is your own. All reports are tied to your account and are not shared with anyone.</p>
                    </div>
                </div>
            </main>

            <footer className="welcome-footer">
                <Link to="/register" className="btn btn-primary btn-cta">Initiate Sequence (Register)</Link>
                <p className="login-prompt">
                    Already have an account? <Link to="/login">Access Terminal (Login)</Link>
                </p>
            </footer>
        </div>
    );
};

export default Welcome;