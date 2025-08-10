import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';

// A helper function to set the auth token in global headers
const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
};

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // --- Actions ---

    // Load User: Checks for a token and gets user info
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('http://localhost:5000/api/auth/user');
            dispatch({ type: 'USER_LOADED', payload: res.data });
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR' });
        }
    };

    // Login User
    const login = async formData => {
        console.log('%c[AuthState] Attempting to log in...', 'color: #ff9900', formData);
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            
            // THE CRUCIAL FIX:
            // Immediately set the token in the headers for the next request.
            if (res.data.token) {
                setAuthToken(res.data.token);
            }

            console.log('%c[AuthState] Login SUCCESS. Dispatching LOGIN_SUCCESS.', 'color: #00ff41');
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
            
            // Now, when loadUser is called, the token is already in the headers.
            loadUser();

        } catch (err) {
            console.error('[AuthState] Login FAILED.', err.response?.data);
            dispatch({
                type: 'LOGIN_FAIL',
                payload: err.response?.data?.msg
            });
        }
    };

    // Logout
    const logout = () => dispatch({ type: 'LOGOUT' });

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                loadUser,
                login,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;