const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res.status(409).json({ status: 409, message: 'Email already exists', data: null, error: null });
    }
    const role = (await User.countDocuments()) === 0 ? 'Admin' : 'Viewer';
    const user = new User({ email, password, role });
    await user.save();
    res.status(201).json({ status: 201, message: 'User created successfully', data: null, error: null });
  } catch (err) {
    res.status(400).json({ status: 400, message: 'Bad Request', data: null, error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(404).json({ status: 404, message: 'Invalid credentials', data: null, error: null });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ status: 200, message: 'Login successful', data: { token }, error: null });
  } catch (err) {
    res.status(400).json({ status: 400, message: 'Bad Request', data: null, error: err.message });
  }
};

exports.logout = (req, res) => {
  try {
    res.status(200).json({ status: 200, message: 'User logged out successfully', data: null, error: null });
  } catch (err) {
    res.status(400).json({ status: 400, message: 'Bad Request', data: null, error: err.message });
  }
};
