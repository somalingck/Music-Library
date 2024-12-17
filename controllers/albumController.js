const Album = require('../models/Album');

// 12. GET /albums: Fetch all albums
exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find().populate('artist'); // Populate artist details
    res.status(200).json({
      status: 200,
      data: albums,
      message: 'Albums retrieved successfully',
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

// 13. GET /albums/:id: Fetch a single album by ID
exports.getAlbumById = async (req, res) => {
  const albumId = req.params.id;

  try {
    const album = await Album.findById(albumId).populate('artist'); // Populate artist details
    if (!album) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Album not found',
        error: null,
      });
    }
    res.status(200).json({
      status: 200,
      data: album,
      message: 'Album retrieved successfully',
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

// 14. POST /albums/add-album: Add a new album
exports.addAlbum = async (req, res) => {
  const { name, year, hidden, artist } = req.body;

  try {
    // Create and save a new album
    const album = new Album({ name, year, hidden, artist });
    await album.save();
    res.status(201).json({
      status: 201,
      data: null,
      message: 'Album created successfully',
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

// 15. PUT /albums/:id: Update an album by ID
exports.updateAlbum = async (req, res) => {
  const albumId = req.params.id;

  try {
    const album = await Album.findByIdAndUpdate(albumId, req.body, { new: true });
    if (!album) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Album not found',
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

// 16. DELETE /albums/:id: Delete an album by ID
exports.deleteAlbum = async (req, res) => {
  const albumId = req.params.id;

  try {
    const album = await Album.findByIdAndDelete(albumId);
    if (!album) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Album not found',
        error: null,
      });
    }
    res.status(200).json({
      status: 200,
      data: null,
      message: 'Album deleted successfully',
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
