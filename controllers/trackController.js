const Track = require('../models/Track');

// 17. GET /tracks: Fetch all tracks
exports.getAllTracks = async (req, res) => {
  try {
    const tracks = await Track.find().populate('album artist'); // Populate album and artist details
    res.status(200).json({
      status: 200,
      data: tracks,
      message: 'Tracks retrieved successfully',
      error: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: err.message,
    });
  }
};

// 18. GET /tracks/:id: Fetch a specific track by ID
exports.getTrackById = async (req, res) => {
  const trackId = req.params.id;

  try {
    const track = await Track.findById(trackId).populate('album artist');
    if (!track) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Track not found',
        error: null,
      });
    }
    res.status(200).json({
      status: 200,
      data: track,
      message: 'Track retrieved successfully',
      error: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: err.message,
    });
  }
};

// 19. POST /tracks/add-track: Add a new track
exports.addTrack = async (req, res) => {
  const { name, duration, hidden, album, artist } = req.body;

  try {
    const track = new Track({ name, duration, hidden, album, artist });
    await track.save();

    res.status(201).json({
      status: 201,
      data: null,
      message: 'Track created successfully',
      error: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: err.message,
    });
  }
};

// 20. PUT /tracks/:id: Update a track by ID
exports.updateTrack = async (req, res) => {
  const trackId = req.params.id;

  try {
    const track = await Track.findByIdAndUpdate(trackId, req.body, { new: true });
    if (!track) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Track not found',
        error: null,
      });
    }
    res.status(204).send(); // No content for successful update
  } catch (err) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: err.message,
    });
  }
};
