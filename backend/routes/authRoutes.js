const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getUserProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback",
    passport.authenticate("google", {
        successRedirect: "https://code-multi-verse.vercel.app/domains",
  failureRedirect: "https://code-multi-verse.vercel.app/login"
    })
);

// GitHub OAuth
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback",
    passport.authenticate("github", {
        successRedirect: "https://code-multi-verse.vercel.app/domains",
  failureRedirect: "https://code-multi-verse.vercel.app/login"
    })
);

// Discord login
router.get("/discord", passport.authenticate("discord"));

// Discord callback
router.get(
  "/discord/callback",
  passport.authenticate("discord", {
   successRedirect: "https://code-multi-verse.vercel.app/domains",
  failureRedirect: "https://code-multi-verse.vercel.app/login"
  })
);

// Get Current Authenticated User
router.get("/user", (req, res) => {
    res.json(req.user || null);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.clearCookie("connect.sid"); // <- if using express-session
    res.status(200).json({ message: "Logged out successfully" });
  });
});

router.get("/profile", protect, getUserProfile);



module.exports = router;
