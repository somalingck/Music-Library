const Artist = require('../models/Artist');

// 7. GET /artists: Fetch all artists
exports.getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find(); // Retrieve all artists
    res.status(200).json({
      status: 200,
      data: artists,
      message: 'Artists retrieved successfully',
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

// 8. GET /artists/:id: Fetch a specific artist by ID
exports.getArtistById = async (req, res) => {
  const artistId = req.params.id;

  try {
    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Artist not found',
        error: null,
      });
    }
    res.status(200).json({
      status: 200,
      data: artist,
      message: 'Artist retrieved successfully',
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

// 9. POST /artists/add-artist: Add a new artist
exports.addArtist = async (req, res) => {
  const { name, grammy, hidden } = req.body;

  try {
    const artist = new Artist({ name, grammy, hidden });
    await artist.save();

    res.status(201).json({
      status: 201,
      data: null,
      message: 'Artist created successfully',
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

// 10. PUT /artists/:id: Update an artist by ID
exports.updateArtist = async (req, res) => {
  const artistId = req.params.id;

  try {
    const artist = await Artist.findByIdAndUpdate(artistId, req.body, { new: true });
    if (!artist) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Artist not found',
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

// 11. DELETE /artists/:id: Delete an artist by ID
exports.deleteArtist = async (req, res) => {
  const artistId = req.params.id;

  try {
    const artist = await Artist.findByIdAndDelete(artistId);
    if (!artist) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Artist not found',
        error: null,
      });
    }
    res.status(200).json({
      status: 200,
      data: null,
      message: 'Artist deleted successfully',
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
