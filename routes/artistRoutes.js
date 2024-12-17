const express = require('express');
const artistController = require('../controllers/artistController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

// 7. GET /artists: Get all artists
router.get('/', authMiddleware, artistController.getAllArtists);

// 8. GET /artists/:id: Get an artist by ID
router.get('/:id', authMiddleware, artistController.getArtistById);

// 9. POST /artists/add-artist: Add a new artist (Admin/Editor only)
router.post(
  '/add-artist',
  authMiddleware,
  roleMiddleware(['Admin', 'Editor']),
  artistController.addArtist
);

// 10. PUT /artists/:id: Update an artist by ID (Admin/Editor only)
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['Admin', 'Editor']),
  artistController.updateArtist
);

// 11. DELETE /artists/:id: Delete an artist by ID (Admin only)
router.delete('/:id', authMiddleware, roleMiddleware(['Admin']), artistController.deleteArtist);

module.exports = router;
