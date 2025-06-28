const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require("../models/User");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// const protect = async (req, res, next) => {
//   // ① Try cookie first
//   let token = req.cookies?.token;

//   // ② If absent fall back to “Bearer <token>”
//   if (!token && req.headers.authorization?.startsWith('Bearer ')) {
//     token = req.headers.authorization.split(' ')[1];
//   }
//   if (!token) return res.status(401).json({ message:'Not authorised' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');
//     next();
//   } catch {
//     return res.status(401).json({ message:'Token invalid / expired' });
//   }
// };

const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    req.user = user; // ✅ safely attach user
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};


module.exports = { protect, authMiddleware };
