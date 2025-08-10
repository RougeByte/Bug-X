import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
    const alertContext = useContext(AlertContext);
    const { alerts } = alertContext;

    const getAlertStyle = (type) => ({
        padding: '1rem',
        margin: '0.5rem 0',
        borderRadius: '5px',
        color: 'white',
        background: type === 'danger' ? 'var(--danger-color)' : 'var(--primary-color)',
        opacity: 0.9
    });

    return (
        alerts.length > 0 &&
        alerts.map(alert => (
            <div key={alert.id} style={getAlertStyle(alert.type)}>
                {alert.msg}
            </div>
        ))
    );
};

export default Alerts;