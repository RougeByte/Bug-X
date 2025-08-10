import React, { useContext } from 'react';
import BugContext from '../../context/bug/bugContext';
import AlertContext from '../../context/alert/alertContext'; // 1. Import AlertContext

const BugItem = ({ bug }) => {
    const bugContext = useContext(BugContext);
    const alertContext = useContext(AlertContext); // 2. Initialize AlertContext

    const { deleteBug, setCurrent, clearCurrent } = bugContext;
    const { setAlert } = alertContext; // 3. Destructure the setAlert function

    const { _id, title, platform, program, status, severity, bounty, url, notes } = bug;

    // 4. Update the onDelete function
    const onDelete = () => {
        deleteBug(_id);
        clearCurrent();
        // Add the alert call here
        setAlert('Report Deleted', 'danger');
    };

    const getStatusClass = (status) => {
        if (!status) return 'badge-pending';
        return `badge badge-${status.toLowerCase().replace(/\s/g, '-').replace(/\//g, '-')}`;
    }

    return (
        <div style={{ background: 'var(--dark-color)', padding: '1rem', margin: '1rem 0', borderLeft: '5px solid var(--primary-color)' }}>
            <h3 style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
                <span className={getStatusClass(status)}>{status}</span>
            </h3>
            <p><strong>Program:</strong> {program} ({platform})</p>
            <p><strong>Severity:</strong> {severity}</p>
            <p><strong>Bounty:</strong> ${bounty ? bounty.toLocaleString() : 0}</p>
            {notes && <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap', background: 'var(--background-color)', padding: '0.5rem' }}><strong>Notes:</strong><br/>{notes}</p>}
            
            <div style={{marginTop: '1rem'}}>
                <button className="btn" onClick={() => setCurrent(bug)}>Edit</button>
                <button className="btn" onClick={onDelete} style={{ background: 'var(--danger-color)', color: 'white', marginLeft: '0.5rem' }}>Delete</button>
            </div>
        </div>
    );
};

export default BugItem;