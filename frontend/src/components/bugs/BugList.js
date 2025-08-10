import React, { useContext } from 'react';
// This is the corrected import path
import BugContext from '../../context/bug/bugContext'; 
import BugItem from './BugItem';
import Spinner from '../layout/Spinner';

// Accept 'bugs' as a prop now
const BugList = ({ bugs }) => {
    const bugContext = useContext(BugContext);
    const { loading } = bugContext; // Still get loading state from context

    if (loading) {
        return <Spinner />;
    }

    if (bugs.length === 0 && !loading) {
        return <h4>// No reports match the current filter.</h4>;
    }

    return (
        <div>
            {bugs.map(bug => (
                <BugItem key={bug._id} bug={bug} />
            ))}
        </div>
    );
};

export default BugList;