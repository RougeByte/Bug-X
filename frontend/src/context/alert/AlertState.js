import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';

const AlertState = props => {
    const initialState = []; // State is an array of alert objects

    const [state, dispatch] = useReducer(alertReducer, initialState);

    // Action: Set Alert
    const setAlert = (msg, type, timeout = 5000) => {
        const id = uuidv4();
        dispatch({
            type: 'SET_ALERT',
            payload: { msg, type, id }
        });

        // Remove the alert after the timeout
        setTimeout(() => dispatch({ type: 'REMOVE_ALERT', payload: id }), timeout);
    };

    return (
        <AlertContext.Provider
            value={{
                alerts: state,
                setAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;