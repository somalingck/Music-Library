const Favorite = require('../models/Favorite');

// 22. GET /favorites/:category: Retrieve user favorites by category
exports.getFavoritesByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    if (!['artist', 'album', 'track'].includes(category)) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: 'Invalid category. Must be "artist", "album", or "track".',
        error: null,
      });
    }

    const favorites = await Favorite.find({ user: req.user.userId, category });
    res.status(200).json({
      status: 200,
      data: favorites,
      message: 'Favorites retrieved successfully',
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

// 23. POST /favorites/add-favorite: Add an item to favorites
exports.addFavorite = async (req, res) => {
  const { category, itemId } = req.body;

  try {
    if (!['artist', 'album', 'track'].includes(category)) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: 'Invalid category. Must be "artist", "album", or "track".',
        error: null,
      });
    }

    // Check if the favorite already exists
    const existingFavorite = await Favorite.findOne({ user: req.user.userId, category, itemId });
    if (existingFavorite) {
      return res.status(409).json({
        status: 409,
        data: null,
        message: 'Item is already in favorites',
        error: null,
      });
    }

    const favorite = new Favorite({ user: req.user.userId, category, itemId });
    await favorite.save();

    res.status(201).json({
      status: 201,
      data: null,
      message: 'Favorite added successfully',
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

// 24. DELETE /favorites/remove-favorite/:id: Remove an item from favorites
exports.removeFavorite = async (req, res) => {
  const favoriteId = req.params.id;

  try {
    const favorite = await Favorite.findByIdAndDelete(favoriteId);

    if (!favorite) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Favorite not found',
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: 'Favorite removed successfully',
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
