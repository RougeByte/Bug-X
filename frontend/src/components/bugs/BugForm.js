import React, { useState, useContext, useEffect } from 'react';
import BugContext from '../../context/bug/bugContext';
import AlertContext from '../../context/alert/alertContext';

const BugForm = () => {
    const bugContext = useContext(BugContext);
    const alertContext = useContext(AlertContext);
    const { addBug, updateBug, clearCurrent, current } = bugContext;
    const { setAlert } = alertContext;

    const [bug, setBug] = useState({
        title: '', platform: 'HackerOne', program: '', url: '',
        status: 'Pending', severity: 'Medium', bounty: '', notes: ''
    });

    useEffect(() => {
        if (current !== null) {
            setBug(current);
        } else {
            setBug({
                title: '', platform: 'HackerOne', program: '', url: '',
                status: 'Pending', severity: 'Medium', bounty: '', notes: ''
            });
        }
    }, [bugContext, current]);

    const { title, platform, program, url, status, severity, bounty, notes } = bug;

    const onChange = e => setBug({ ...bug, [e.target.name]: e.target.value });

    // THIS IS THE CORRECTED FUNCTION
    const onSubmit = e => {
        e.preventDefault();

        const dataToSend = {
            ...bug,
            bounty: bug.bounty === '' ? 0 : parseInt(bug.bounty, 10)
        };

        if (current === null) {
            addBug(dataToSend);
            setAlert('Report Added Successfully', 'success');
        } else {
            updateBug({ ...dataToSend, _id: current._id });
            setAlert('Report Updated Successfully', 'success');
        }
        
        clearAll();
    };

    const clearAll = () => {
        clearCurrent();
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>{current ? '// Edit Report' : '// Add New Report'}</h2>
            
            <h4>// Report Details</h4>
            <input type="text" name="title" placeholder="Report Title" value={title} onChange={onChange} required />
            <input type="text" name="program" placeholder="Program Name" value={program} onChange={onChange} required />
            <input type="url" name="url" placeholder="URL of Report" value={url} onChange={onChange} required />
            
            <h4>// Classification</h4>
            <select name="platform" value={platform} onChange={onChange}>
                <option value="HackerOne">HackerOne</option>
                <option value="Bugcrowd">Bugcrowd</option>
                <option value="Intigriti">Intigriti</option>
                <option value="YesWeHack">YesWeHack</option>
                <option value="Private">Private</option>
                <option value="Other">Other</option>
            </select>
            
            <select name="status" value={status} onChange={onChange}>
                <option value="Pending">Pending</option>
                <option value="Triaged">Triaged</option>
                <option value="Resolved">Resolved</option>
                <option value="Awarded">Awarded</option>
                <option value="Duplicate">Duplicate</option>
                <option value="Informative">Informative</option>
                <option value="N/A">N/A</option>
            </select>
            
            <select name="severity" value={severity} onChange={onChange}>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
                <option value="Informational">Informational</option>
            </select>
            
            <h4>// Financials & Notes</h4>
            <input type="number" name="bounty" placeholder="Bounty Amount ($)" value={bounty} onChange={onChange} />
            <textarea name="notes" placeholder="Add personal notes, PoC details, etc." value={notes} onChange={onChange}></textarea>
            
            <input type="submit" value={current ? 'Update Report' : 'Add Report'} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} />

            {current && (
                <div>
                    <button className="btn" style={{width: '100%', marginTop: '1rem'}} onClick={clearAll}>
                        Cancel Edit
                    </button>
                </div>
            )}
        </form>
    );
};

export default BugForm;