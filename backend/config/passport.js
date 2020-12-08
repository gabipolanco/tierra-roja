const bcrypt = require("bcrypt")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const googleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/User")

passport.use(
    new LocalStrategy({
            usernameField: "email",
            passwordField: "password"
        },
        async(email, password, done) => {
            try {
                const user = await User.findOne({ email })
                if (!user) {
                    return done(null, false, { message: "Incorrect email" })
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: "Incorrect password" })
                }
                done(null, user)
            } catch (err) {
                console.log(err)
            }
        }
    )
)

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

module.exports = passport
