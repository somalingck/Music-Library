const express = require('express');
const favoriteController = require('../controllers/favoriteController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// 22. GET /favorites/:category: Retrieve user favorites by category (artist, album, or track)
router.get('/:category', authMiddleware, favoriteController.getFavoritesByCategory);

// 23. POST /favorites/add-favorite: Add an item to favorites
router.post('/add-favorite', authMiddleware, favoriteController.addFavorite);

// 24. DELETE /favorites/remove-favorite/:id: Remove an item from favorites
router.delete('/remove-favorite/:id', authMiddleware, favoriteController.removeFavorite);

module.exports = router;
