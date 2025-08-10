const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

// IMPORTANT: We are importing the functions we just created in the controller
const { 
    getBugs, 
    createBug, 
    updateBug, 
    deleteBug 
} = require('../controllers/bugController');

// Chain routes for '/'
// All these routes will first go through the 'auth' middleware
router.route('/')
    .get(auth, getBugs)
    .post(auth, createBug);

// Chain routes for '/:id'
// All these routes will also be protected by 'auth'
router.route('/:id')
    .put(auth, updateBug)
    .delete(auth, deleteBug);

// This is the line that makes it all work. It exports the router.
module.exports = router;