const Bug = require('../models/Bug');

// @desc    Get all bugs for a user
// @route   GET /api/bugs
// @access  Private
exports.getBugs = async (req, res) => {
    try {
        const bugs = await Bug.find({ user: req.user.id }).sort({ reportedAt: -1 });
        res.json(bugs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create a bug
// @route   POST /api/bugs
// @access  Private
exports.createBug = async (req, res) => {
    // Destructure all fields from the request body
    const { title, platform, program, url, status, severity, bounty, notes } = req.body;
    
    try {
        const newBug = new Bug({
            user: req.user.id, // Comes from the auth middleware
            title,
            platform,
            program,
            url,
            status,
            severity,
            bounty,
            notes
        });

        // Save the bug to the database
        const bug = await newBug.save();

        // THIS IS THE CRUCIAL LINE:
        // Send the complete 'bug' object back to the frontend as a JSON response.
        res.json(bug);

    } catch (err) {
        console.error('ERROR in createBug:', err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update a bug
// @route   PUT /api/bugs/:id
// @access  Private
exports.updateBug = async (req, res) => {
    const { title, platform, program, url, status, severity, bounty, notes } = req.body;

    // Build bug object based on fields that were submitted
    const bugFields = {};
    if (title) bugFields.title = title;
    if (platform) bugFields.platform = platform;
    if (program) bugFields.program = program;
    if (url) bugFields.url = url;
    if (status) bugFields.status = status;
    if (severity) bugFields.severity = severity;
    if (bounty !== undefined) bugFields.bounty = bounty;
    if (notes) bugFields.notes = notes;

    try {
        let bug = await Bug.findById(req.params.id);

        if (!bug) return res.status(404).json({ msg: 'Bug not found' });

        // Make sure user owns the bug
        if (bug.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        bug = await Bug.findByIdAndUpdate(
            req.params.id,
            { $set: bugFields },
            { new: true } // Return the new, updated document
        );

        res.json(bug);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @desc    Delete a bug
// @route   DELETE /api/bugs/:id
// @access  Private
exports.deleteBug = async (req, res) => {
    try {
        // Find the bug by the ID from the URL parameters
        let bug = await Bug.findById(req.params.id);

        if (!bug) {
            return res.status(404).json({ msg: 'Bug not found' });
        }

        // Make sure the logged-in user owns the bug they are trying to delete
        if (bug.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // THIS IS THE LIKELY FIX. Use findByIdAndDelete instead of the old method.
        await Bug.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Bug removed' });

    } catch (err) {
        // Log the actual error on the server for debugging
        console.error('DELETE BUG ERROR:', err.message);
        res.status(500).send('Server Error');
    }
};
