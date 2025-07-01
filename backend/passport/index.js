/* eslint-disable camelcase */
const passport        = require("passport");
const GoogleStrategy  = require("passport-google-oauth20").Strategy;
const GitHubStrategy  = require("passport-github2").Strategy;
const DiscordStrategy = require("passport-discord").Strategy;
const User            = require("../models/User");

const BASE_URL = process.env.VITE_API_URL;

/* ────────────────── session helpers ────────────────── */
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
  User.findById(id).then(u => done(null, u))
);

/* ────────────────── GOOGLE ────────────────── */
passport.use(new GoogleStrategy(
  {
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:  `${BASE_URL}/auth/google/callback`,
    proxy:        true             // ← behind Render proxy
  },
  async (_at, _rt, profile, done) => {
    const user =
      await User.findOne({ googleId: profile.id }) ||
      await User.create({
        name:  profile.displayName,
        email: profile.emails?.[0]?.value,
        googleId: profile.id,
      });
    return done(null, user);
  }
));

/* ────────────────── GITHUB ────────────────── */
passport.use(new GitHubStrategy(
  {
    clientID:     process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL:  `${BASE_URL}/auth/github/callback`,
    scope:        ["user:email"],
    proxy:        true
  },
  async (_at, _rt, profile, done) => {
    const user =
      await User.findOne({ githubId: profile.id }) ||
      await User.create({
        githubId: profile.id,
        name:  profile.displayName || profile.username,
        email: profile.emails?.[0]?.value || `${profile.username}@github.com`,
      });
    return done(null, user);
  }
));

/* ────────────────── DISCORD ────────────────── */
passport.use(new DiscordStrategy(
  {
    clientID:     process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL:  `${BASE_URL}/auth/discord/callback`,
    scope:        ["identify", "email"],
    proxy:        true
  },
  async (_at, _rt, profile, done) => {
    let user = await User.findOne({ discordId: profile.id }) ||
               await User.findOne({ email: profile.email });

    if (user) {
      user.discordId = profile.id;
      await user.save();
      return done(null, user);
    }

    user = await User.create({
      name: profile.username,
      email: profile.email,
      discordId: profile.id,
    });
    return done(null, user);
  }
));

module.exports = passport;
