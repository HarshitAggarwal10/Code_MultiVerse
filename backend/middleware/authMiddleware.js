const jwt = require('jsonwebtoken');
const User = require("../models/User");
require('dotenv').config();

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Set user from DB
      req.user = await User.findById(decoded.id).select('-password');

      // ✅ Now log properly
      console.log("✅ Token:", token);
      console.log("✅ User from token:", req.user);

      return next();
    } catch (err) {
      console.error('❌ Token error:', err.message);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }

  return res.status(401).json({ message: 'Unauthorized' });
};

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: "Unauthorized" });
};

module.exports = { protect, isAuthenticated };
