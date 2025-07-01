/**
 * ./passport.js   〈–– stays in the root of your backend as before〉
 */
const passport        = require("passport");
const GoogleStrategy  = require("passport-google-oauth20").Strategy;
const GitHubStrategy  = require("passport-github2").Strategy;
const DiscordStrategy = require("passport-discord").Strategy;
const User            = require("./models/User");          // ← path unchanged

/* ------------------------------------------------------------------ */
/*  helpers                                                           */
/* ------------------------------------------------------------------ */
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id).then(u => done(null, u)));

/* Handy so we don’t hard‑code URLs twice: */
const BACKEND   = process.env.BACKEND_URL   || "https://code‑multiverse‑backend.onrender.com";
const CALLBACK  = (p) => `${BACKEND}${p}`;        // e.g. /auth/google/callback → full URL

/* ------------------------------------------------------------------ */
/*  GOOGLE                                                            */
/* ------------------------------------------------------------------ */
passport.use(new GoogleStrategy(
  {
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:  CALLBACK("/auth/google/callback"),
  },
  async (_, __, profile, done) => {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({
        name:  profile.displayName,
        email: profile.emails?.[0]?.value,
        googleId: profile.id,
      });
    }
    done(null, user);
  }
));

/* ------------------------------------------------------------------ */
/*  GITHUB                                                            */
/* ------------------------------------------------------------------ */
passport.use(new GitHubStrategy(
  {
    clientID:     process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL:  CALLBACK("/auth/github/callback"),
  },
  async (_, __, profile, done) => {
    let user = await User.findOne({ githubId: profile.id });
    if (!user) {
      user = await User.create({
        githubId: profile.id,
        name:     profile.displayName || profile.username,
        email:    profile.emails?.[0]?.value || `${profile.username}@github.com`,
      });
    }
    done(null, user);
  }
));

/* ------------------------------------------------------------------ */
/*  DISCORD                                                           */
/* ------------------------------------------------------------------ */
passport.use(new DiscordStrategy(
  {
    clientID:     process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL:  CALLBACK("/auth/discord/callback"),
    scope: ["identify", "email"],
  },
  async (_, __, profile, done) => {
    let user = await User.findOne({ discordId: profile.id });
    if (!user) {
      // if the e‑mail already exists, link accounts — otherwise create new
      user = await User.findOne({ email: profile.email }) ??
             await User.create({
               discordId: profile.id,
               name:   profile.username,
               email:  profile.email,
             });
    } else if (!user.discordId) {
      user.discordId = profile.id;
      await user.save();
    }
    done(null, user);
  }
));
