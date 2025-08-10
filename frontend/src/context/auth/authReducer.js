// A reducer decides how the state changes in response to actions
export default (state, action) => {
    // THIS IS OUR FIRST LOG. It will fire for EVERY action.
    console.log(`%c[authReducer] Action: ${action.type}`, 'color: #00ff41', { payload: action.payload, oldState: state });

    switch (action.type) {
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS': // Let's handle register the same way
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            };
        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};