const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const GOOGLE_CLIENT_ID =
  "994643100753-q87hg636m1bigp3b20kr28r71dt5adh0.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GITHUB_CLIENT_ID = '416933e8dc4f9ed0dcb9';
const GITHUB_CLIENT_SECRET = 'a5b75f1781c9c1c85db9d5ce70eb55f358ef0bcd';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
