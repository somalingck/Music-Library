const mongoose = require('mongoose');

// Define the artist schema
const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  grammy: {
    type: Boolean,
    default: false, // Example default value
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  // Ensure there is no incorrect reference like FontFaceSetLoadEvent
  // Other fields can be added based on your requirements
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
