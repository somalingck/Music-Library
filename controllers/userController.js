const User = require('../models/User');

// 1. GET /users: Fetch all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords from response
    res.status(200).json({
      status: 200,
      data: users,
      message: 'Users retrieved successfully',
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

// 2. POST /users/add-user: Add a new user (Admin only)
exports.addUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Check if user already exists
    if (await User.findOne({ email })) {
      return res.status(409).json({
        status: 409,
        data: null,
        message: 'Email already exists',
        error: null,
      });
    }

    // Create and save a new user
    const user = new User({ email, password, role });
    await user.save();

    res.status(201).json({
      status: 201,
      data: null,
      message: 'User added successfully',
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

// 3. DELETE /users/:id: Delete a user by ID (Admin only)
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'User not found',
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: 'User deleted successfully',
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

// 4. PUT /users/update-password: Update user password
exports.updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.userId);

    // Check if user exists and the old password matches
    if (!user || !(await user.comparePassword(oldPassword))) {
      return res.status(401).json({
        status: 401,
        data: null,
        message: 'Unauthorized Access',
        error: null,
      });
    }

    // Update the password
    user.password = newPassword;
    await user.save();

    res.status(204).send(); // No content response
  } catch (err) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: err.message,
    });
  }
};
