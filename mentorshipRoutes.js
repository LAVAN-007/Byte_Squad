// mentorshipRoutes.js

const express = require('express');
const router = express.Router('./mentorshipRoutes.js');
const Mentorship = require('./models/Mentorship.js');
const mentorshipController = require('../controllers/mentorshipController');

// Route to create mentorship
router.post('/mentorship', mentorshipController.createMentorship);


// Define routes

module.exports = router;
