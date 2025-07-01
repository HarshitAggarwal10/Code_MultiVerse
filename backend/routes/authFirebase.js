const express = require("express");
const router = express.Router();
const admin = require("../config/firebaseAdmin");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/firebase", async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ message: "Missing ID token" });

    const decoded = await admin.auth().verifyIdToken(idToken);
    const { email, name, uid } = decoded;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: name || email.split("@")[0],
        email,
        firebaseUid: uid,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Firebase auth failed" });
  }
});

module.exports = router;
