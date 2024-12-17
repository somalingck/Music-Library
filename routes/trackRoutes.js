const express = require('express');
const trackController = require('../controllers/trackController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

// 17. GET /tracks: Get all tracks
router.get('/', authMiddleware, trackController.getAllTracks);

// 18. GET /tracks/:id: Get a specific track by ID
router.get('/:id', authMiddleware, trackController.getTrackById);

// 19. POST /tracks/add-track: Add a new track (Admin/Editor only)
router.post(
  '/add-track',
  authMiddleware,
  roleMiddleware(['Admin', 'Editor']),
  trackController.addTrack
);

// 20. PUT /tracks/:id: Update an existing track by ID (Admin/Editor only)
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['Admin', 'Editor']),
  trackController.updateTrack
);

module.exports = router;
