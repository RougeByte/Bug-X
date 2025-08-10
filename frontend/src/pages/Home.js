import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';
import BugContext from '../context/bug/bugContext';

const Home = () => {
    const authContext = useContext(AuthContext);
    const bugContext = useContext(BugContext);

    // Get the user's name from the auth context
    const { user, loadUser } = authContext;
    // Get the number of bugs from the bug context
    const { bugs, getBugs } = bugContext;

    useEffect(() => {
        // Load user and bug data when the component mounts
        loadUser();
        getBugs();
        // eslint-disable-next-line
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <header>
                {/* Personalize the welcome message */}
                <h1>Welcome back, <span style={{ color: 'var(--primary-color)' }}>{user && user.username}</span></h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--light-color)', margin: '1rem 0 2rem 0' }}>
                    // Ready to find the next big vulnerability?
                </p>
            </header>

            <main>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
                    <div className="feature-card" style={{ flex: 1, maxWidth: '300px' }}>
                        <h3>Total Reports</h3>
                        <p style={{ fontSize: '2.5rem', color: 'var(--primary-color)' }}>{bugs.length}</p>
                    </div>
                    <div className="feature-card" style={{ flex: 1, maxWidth: '300px' }}>
                        <h3>Total Bounty</h3>
                        {/* We sum up the bounty from all bugs */}
                        <p style={{ fontSize: '2.5rem', color: 'var(--primary-color)' }}>
                            ${bugs.reduce((acc, bug) => acc + bug.bounty, 0).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* This is the field that redirects to the add report page (Dashboard) */}
                <div style={{ background: 'var(--dark-color)', padding: '2rem', borderRadius: '5px' }}>
                    <h3>// Start a New Hunt</h3>
                    <p>Log a new vulnerability report and keep track of your progress.</p>
                    <Link to="/dashboard" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                        Add New Report
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default Home;