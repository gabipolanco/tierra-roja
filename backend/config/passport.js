const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const googleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: "false"
},
  (email, password, done) => {
    User.findOne({ email })
      .then(foundUser => {
        if (!foundUser) {
          done(null, false, { message: 'Incorrect email' });
          return;
        }
        if (!foundUser.confirmed) {
          done(null, false, {message: 'You need to confirm your email'})
          return
        }
        if (!bcrypt.compareSync(password, foundUser.password)) {
          done(null, false, { message: 'Incorrect password' });
          return;
        }

        done(null, foundUser);
      })
      .catch(err => done(err));
  }
));

passport.serializeUser((loggedInUser, cb) => {
    cb(null, loggedInUser._id);
  });
  
  passport.deserializeUser((userIdFromSession, cb) => {
    User.findById(userIdFromSession)
    .then(userDocument => {
      cb(null, userDocument);
    })
    .catch(err => {
      cb(err);
    })
  });

  passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: '/auth/google/callback'
  },
    async (_, __, { id, emails, photos }, done) => {
      const user = await User.findOne({ googleID: id })
  
      if (!user) {
        const newUser = await User.create({
          googleID: id,
          email: emails[0].value,
          image: photos[0].value
        })
        done(null, newUser)
        return;
      }
  
      done(null, user);
    }
  ));

  module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
  }