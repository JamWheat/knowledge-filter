const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ googleId: profile.id }, function (err, user) {
        if (err) return done(err);
        if (user) {
          //if statement checking for avatar
          if (!user.avatar) {
            user.avatar = profile.photos[0].value;
            user.save(function (err) {
              return done(null, user);
            });
          }
          return done(null, user);
        } else {
          var newUser = new User({
            name: profile.displayName,
            alias: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            icon: profile.photos[0].value,
            altIcon: profile.photos[0].value,
          });
          newUser.save(function (err) {
            if (err) return done(err);
            return done(null, newUser);
          });
        }
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});