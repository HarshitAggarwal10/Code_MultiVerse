const express   = require("express");
const passport  = require("passport");
const router    = express.Router();

const FRONT_URL = "https://code-multi-verse.vercel.app";

/* ───────── GOOGLE ───────── */
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/google/callback",
  passport.authenticate("google", {
    successRedirect: `${FRONT_URL}/domains`,
    failureRedirect: `${FRONT_URL}/login`
  })
);

/* ───────── GITHUB ───────── */
router.get("/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get("/github/callback",
  passport.authenticate("github", {
    successRedirect: `${FRONT_URL}/domains`,
    failureRedirect: `${FRONT_URL}/login`
  })
);

/* ───────── DISCORD ───────── */
router.get("/discord",
  passport.authenticate("discord")
);
router.get("/discord/callback",
  passport.authenticate("discord", {
    successRedirect: `${FRONT_URL}/domains`,
    failureRedirect: `${FRONT_URL}/login`
  })
);

/* current session helper */
router.get("/user", (req, res) => res.json(req.user || null));

/* logout */
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
});

module.exports = router;
