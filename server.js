// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const artistRoutes = require('./routes/artistRoutes');
const albumRoutes = require('./routes/albumRoutes');
const trackRoutes = require('./routes/trackRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


  
// Routes
app.use('/api/v1/auth', authRoutes);           // Authentication routes (signup, login, logout)
app.use('/api/v1/users', userRoutes);           // User management routes
app.use('/api/v1/artists', artistRoutes);       // Artist routes (CRUD)
app.use('/api/v1/albums', albumRoutes);         // Album routes (CRUD)
app.use('/api/v1/tracks', trackRoutes);         // Track routes (CRUD)
app.use('/api/v1/favorites', favoriteRoutes);   // Favorite management routes (add/remove favorites)

// Default route to handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Route not found',
    error: 'Not Found',
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
