export default (state, action) => {
    switch (action.type) {
        case 'SET_ALERT':
            return [...state, action.payload]; // Add new alert to the array
        case 'REMOVE_ALERT':
            return state.filter(alert => alert.id !== action.payload); // Remove by ID
        default:
            return state;
    }
};