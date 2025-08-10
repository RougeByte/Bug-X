import React, { useState, useContext, useEffect } from 'react';
import BugForm from '../components/bugs/BugForm';
import BugList from '../components/bugs/BugList';
import BugContext from '../context/bug/bugContext';

const Dashboard = () => {
    const bugContext = useContext(BugContext);
    const { bugs, getBugs } = bugContext;

    // State to hold the current filter value
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        getBugs();
        // eslint-disable-next-line
    }, []);

    // Create the filtered list of bugs
    const filteredBugs = bugs.filter(bug => {
        if (filter === 'all') return true;
        return bug.status === filter;
    });

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginTop: '2rem' }}>
            <div>
                <BugForm />
            </div>
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h2>// My Reports</h2>
                    <select name="filter" onChange={e => setFilter(e.target.value)} value={filter} style={{width: '150px'}}>
                        <option value="all">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Triaged">Triaged</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Awarded">Awarded</option>
                    </select>
                </div>
                {/* Pass the filtered list to BugList */}
                <BugList bugs={filteredBugs} />
            </div>
        </div>
    );
};

export default Dashboard;