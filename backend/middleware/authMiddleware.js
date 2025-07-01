const jwt = require('jsonwebtoken');
const User = require("../models/User");
require('dotenv').config();

/**
 * ✅ Middleware to protect routes using JWT
 * It expects token in Authorization header as: Bearer <token>
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user (excluding password) to request
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (err) {
      console.error('Token error:', err.message);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }

  return res.status(401).json({ message: 'Unauthorized' });
};

/**
 * Optional middleware if you're using sessions + Passport (OAuth)
 */
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: "Unauthorized" });
};

module.exports = { protect, isAuthenticated };
