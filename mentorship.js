// mentorship.js

const mongoose = require('mongoose');

// Define Mentorship Schema
// Define Mentorship model

const mentorshipSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming 'User' is the related model
  mentee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming 'User' is the related model
  // Other fields
  description: String,
});
const express = require('express');
const finalhandler = require('finalhandler');

const Mentorship = express();

// Define a simple middleware function
const customMiddleware = (req, res, next) => {
  // Perform some middleware logic
  console.log('Custom middleware executed');
  next(); // Call next to proceed to the next middleware or route handler
};

// Apply the custom middleware to all routes
app.use(customMiddleware);

// Define a route handler
app.get('/', (req, res) => {
  // Send a response
  res.send('Hello, world!');
});

// Define an error-handling middleware
app.use((err, req, res, next) => {
  // Use finalhandler to handle errors
  finalhandler(req, res)(err);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const MentorShip = mongoose.model('MentorShip', mentorshipSchema);
module.exports = MentorShip;



// Example route handler to create and save mentorship data
const createMentorship = async (req, res) => {
    try {
        // Extract mentor and mentee IDs from request body or wherever they are available
        const { mentorId, menteeId } = req.body;

        // Create a new Mentorship document
        const mentorship = new Mentorship({
            mentor: mentorId,
            mentee: menteeId,
            // Other fields specific to mentorship
        });

        // Save the mentorship document to the database
        await mentorship.save();

        res.status(201).json({ message: 'Mentorship created successfully', mentorship });
    } catch (error) {
        console.error('Error saving mentorship:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createMentorship,
    // Other controller methods
};


// Create a new Mentorship document
const newMentorship = new Mentorship({
  mentor: '<MENTOR_ID>', // Replace <MENTOR_ID> with the actual ID of the mentor
  mentee: '<MENTEE_ID>', // Replace <MENTEE_ID> with the actual ID of the mentee
  startDate: new Date(), // Set the start date
  // endDate: new Date('2024-12-31'), // Optionally set the end date
  // status: 'active' // Optionally set the status
});

// Save the Mentorship document to the database
newMentorship.save()
  .then(mentorship => {
    console.log('Mentorship saved successfully:',mentorship);
  })
  .catch(error => {
    console.error('Error saving mentorship:', error);
  });
