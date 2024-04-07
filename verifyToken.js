const jwt = require('jsonwebtoken');

module.exports = (app) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const decodedToken = jwt.verify(token, 'secret_key');
      req.userData = { userId: decodedToken.userId };
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};
const express = require('express');
const app = express();

// Middleware for error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }); // Import and pass 'app'


  const verifyToken = express(); 

  app.use('/api/protectedRoute', verifyToken, (req, res) => {
      // This route is protected by the verifyToken middleware
      // You can access the user information from req.userData
      res.json({ message: 'Authenticated user', userData: req.userData });
  });
  
  app.listen(3000, () => {
      console.log('Server is running on port 3000');
  });

// Only allow authenticated users to access protected endpoints
const mentorshipRoutes=express();
app.use('/api/mentorship', verifyToken, mentorshipRoutes);

// Example authentication logic
app.post('/login', (req, res) => {
    // Authenticate user (e.g., validate credentials, fetch user from database)
    const user = getUserById(req.body.userId); // Example function to fetch user by ID
    
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Define token expiration and sign JWT token
    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });

    // Return token to client
    res.json({ token });
});

// Example function to fetch user by ID
function getUserById(userId) {
    // This is a placeholder function, replace it with your actual function
    // that fetches user information from a database based on user ID
    return { _id: userId, username: 'example_user' };
}


