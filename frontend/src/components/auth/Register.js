import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AlertContext from '../../context/alert/alertContext'; // Make sure you have alert context for feedback

// Assuming you have an Alert component
const Alert = ({ message, type }) => (
    <div style={{ padding: '1rem', background: type === 'danger' ? 'var(--danger-color)' : 'var(--primary-color)', color: 'white', margin: '1rem 0' }}>{message}</div>
);

const Register = () => {
    const navigate = useNavigate();
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    // 1. Add a loading state
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });
    
    const { username, email, password, password2 } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        if (password !== password2) {
            return setAlert('Passwords do not match', 'danger');
        }

        // 2. Set loading to true when submission starts
        setLoading(true);

        try {
            const newUser = { username, email, password };
            await axios.post('http://localhost:5000/api/auth/register', newUser);
            
            // On success, show a message and immediately redirect
            setAlert('Registration successful! Please log in.', 'success');
            navigate('/login');

        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'An unknown error occurred.';
            setAlert(errorMsg, 'danger');
            // 4. Set loading back to false on error so the user can try again
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: 'auto' }}>
            <h2>// Account <span style={{ color: 'var(--light-color)' }}>Register</span></h2>
            {/* We'll use the AlertContext for feedback now */}
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={username} onChange={onChange} required disabled={loading} />
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange} required disabled={loading} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required minLength="6" disabled={loading} />
                </div>
                <div>
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name="password2" value={password2} onChange={onChange} required minLength="6" disabled={loading} />
                </div>
                
                {/* 3. Change the button's appearance and behavior based on loading state */}
                <input 
                    type="submit" 
                    value={loading ? 'Registering...' : 'Register'} 
                    className="btn btn-primary" 
                    style={{width: '100%', marginTop: '1rem'}} 
                    disabled={loading} 
                />
            </form>
        </div>
    );
};

export default Register;