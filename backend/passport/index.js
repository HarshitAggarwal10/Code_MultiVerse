//rzp_test_DHyKCkAB21NWFU   key id

//EWtTWFoI3ZMzd3W86UellENW  key scret

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const DiscordStrategy = require("passport-discord").Strategy;
const User = require("../models/User");

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
});

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id });
    if (existingUser) return done(null, existingUser);

    const newUser = await User.create({
        name: profile.displayName,
        email: profile.emails?.[0]?.value,
        googleId: profile.id
    });
    return done(null, newUser);
}));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/github/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ githubId: profile.id });

            if (!user) {
                user = await User.create({
                    githubId: profile.id,
                    name: profile.displayName || profile.username,
                    email: profile.emails?.[0]?.value || `${profile.username}@github.com`
                });
            }

            done(null, user);
        } catch (err) {
            done(err, null);
        }
    }));

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/discord/callback",
      scope: ["identify", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // Find by discordId first
        let user = await User.findOne({ discordId: profile.id });

        if (user) {
          return done(null, user);
        }

        // If not found by discordId, check if the email exists
        user = await User.findOne({ email: profile.email });

        if (user) {
          // If email exists, update that user with discordId
          user.discordId = profile.id;
          await user.save();
          return done(null, user);
        }

        // If email also doesn't exist, create new user
        const newUser = new User({
          name: profile.username,
          email: profile.email,
          discordId: profile.id,
        });

        await newUser.save();
        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

//AQVypBMqREOO4tkCuJ4J5JY0_VbXjDDTadMBRQxrHqWSwf6hb0nnHcsTNMnfBabk-NRmxqmS26Vh6jtFJKkIJQNZpvoulyTVPg5HZwyb-7K93P4H-zDOeNFkjWwLi0xl88b7wyw0OlmoCawuITy73fOANrZB5g-Lt9O_gsP8sayVba644vl5AWxsvDihQTwBFDYZEhn1OtezEWXcXVdG2CFxQld3sKO1zXC6FdFTC8oOuVJKp55jbeZUHNb1dULh_L4nIqAlEI4lbf_xPOw_2mNjrFU1wvZ370aCM-3GUyoYY6a9LQ9tLAUdlrI5PMrahTC841MLM-qwQYzDlYDXVoBjA6vzeQ

//https://discord.com/oauth2/authorize?client_id=1383712277735276564&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fdiscord%2Fcallback&scope=identify+email


//PnTC2aBVXi38UPCC password mongodb atlas  harshitaggarwal100306
//mongodb+srv://<db_username>:<db_password>@cluster0.ywvm32s.mongodb.net/
//mongodb+srv://<db_username>:<db_password>@cluster0.ywvm32s.mongodb.net/