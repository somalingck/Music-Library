const mongoose = require('mongoose');

// Define the favorite schema
const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,  // Ensures that the user field is required
  },
  category: {
    type: String,
    enum: ['artist', 'album', 'track'],  // Allows only these values for category
    required: true,  // Ensures that the category field is required
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,  // Ensures that itemId field is required
  },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
