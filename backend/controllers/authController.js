/* ---------------- controllers/authController.js ---------------- */
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* helper -------------------------------------------------------- */
const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not set in env');
  }
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};
/* cookie options reused in both routes */
const cookieOpts = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Strict',
  maxAge: 30 * 24 * 60 * 60 * 1000,        // 30 days
};

/* ----------------------------- SIGN‑UP ------------------------ */
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    /* 1 . email uniqueness */
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    /* 2 . create user */
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashed });

    /* 3 . token + cookie + header */
    const token = generateToken(newUser);
    res
      .cookie('token', token, cookieOpts)
      .set('x-access-token', token);

    /* 4 . send body */
    return res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin || false
      },
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Registration failed' });
  }
};

/* ----------------------------- LOGIN -------------------------- */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* 1 . lookup */
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    /* 2 . password check */
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    /* 3 . token + cookie + header */
    const token = generateToken(user);
    res
      .cookie('token', token, cookieOpts)
      .set('x-access-token', token);

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin || false
      },
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Login failed' });
  }
};

/* ----------------------------- LOGOUT ------------------------- */
exports.logout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logged out' });
};

/* -------------------------- PROFILE --------------------------- */
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({
      name: user.name,
      email: user.email,
      enrolledSubjects: user.enrolledSubjects,
      createdAt: user.createdAt,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
