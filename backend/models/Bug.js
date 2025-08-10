const mongoose = require('mongoose');

const BugSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    platform: { 
        type: String, 
        required: true,
        enum: ['HackerOne', 'Bugcrowd', 'Intigriti', 'YesWeHack', 'Private', 'Other']
    },
    program: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Triaged', 'Resolved', 'Duplicate', 'Informative', 'N/A', 'Awarded'],
        default: 'Pending'
    },
    severity: {
        type: String,
        enum: ['Critical', 'High', 'Medium', 'Low', 'Informational'],
        default: 'Medium'
    },
    bounty: {
        type: Number,
        default: 0
    },
    reportedAt: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String
    }
});

module.exports = mongoose.model('Bug', BugSchema);