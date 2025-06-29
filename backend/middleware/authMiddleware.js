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
  if (req.isAuthenticated && req.isAuthenticated()) {          // <-- NEW
    return next();
  }

  /* ② Otherwise fall back to JWT check (unchanged part) */
  const token =
      req.cookies.token ||                   // from cookie
      req.headers["x-access-token"] ||       // custom header
      (req.headers.authorization || "").split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: "Unauthorized" });
}


module.exports = { protect, authMiddleware, isAuthenticated };
