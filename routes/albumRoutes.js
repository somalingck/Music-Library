const express = require('express');
const albumController = require('../controllers/albumController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

// 12. GET /albums: Get all albums
router.get('/', authMiddleware, albumController.getAllAlbums);

// 13. GET /albums/:id: Get an album by ID
router.get('/:id', authMiddleware, albumController.getAlbumById);

// 14. POST /albums/add-album: Add a new album (Admin/Editor only)
router.post(
  '/add-album',
  authMiddleware,
  roleMiddleware(['Admin', 'Editor']),
  albumController.addAlbum
);

// 15. PUT /albums/:id: Update an album by ID (Admin/Editor only)
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['Admin', 'Editor']),
  albumController.updateAlbum
);

// 16. DELETE /albums/:id: Delete an album by ID (Admin only)
router.delete('/:id', authMiddleware, roleMiddleware(['Admin']), albumController.deleteAlbum);

module.exports = router;
