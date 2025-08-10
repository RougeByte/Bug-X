export default (state, action) => {
    switch (action.type) {
        case 'GET_BUGS':
            return {
                ...state,
                bugs: action.payload,
                loading: false
            };

        case 'ADD_BUG':
            return {
                ...state,
                bugs: [action.payload, ...state.bugs],
                loading: false
            };

        case 'DELETE_BUG':
            // The logic for DELETE_BUG now correctly returns its own value.
            return {
                ...state,
                bugs: state.bugs.filter(bug => bug._id !== action.payload),
                loading: false
            };

        case 'UPDATE_BUG':
            // UPDATE_BUG is now its own separate case.
            return {
                ...state,
                bugs: state.bugs.map(bug =>
                    bug._id === action.payload._id ? action.payload : bug
                ),
                loading: false
            };

        case 'SET_CURRENT':
            return {
                ...state,
                current: action.payload
            };
            
        case 'CLEAR_CURRENT':
            return {
                ...state,
                current: null
            };

        case 'BUG_ERROR':
            return {
                ...state,
                error: action.payload
            };
            
        default:
            return state;
    }
};