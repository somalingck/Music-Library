const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

// 3. GET /users: Fetch all users (Admin only)
router.get('/', authMiddleware, roleMiddleware(['Admin']), userController.getAllUsers);

// 4. POST /users/add-user: Add a new user (Admin only)
router.post(
  '/add-user',
  authMiddleware,
  roleMiddleware(['Admin']),
  userController.addUser
);

// 5. DELETE /users/:id: Delete a user by ID (Admin only)
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['Admin']),
  userController.deleteUser
);

// 6. PUT /users/update-password: Update the user password
router.put(
  '/update-password',
  authMiddleware,
  userController.updatePassword
);

module.exports = router;
