const bcrypt = require("bcrypt")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
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

passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });
  
  passport.deserializeUser(async (id, cb) => {
    try { 
      const user = await User.findById(id)
      cb(null, user)
    }
    catch (err) {
      cb(err);
    }
  });

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: '/auth/google/callback'
  },
    async (_, __, profile, done) => {
      const user = await User.findOne({ googleId: profile.id })
  
      if (!user) {
        const newUser = await User.create({
          googleId: profile.id,
          username: profile.emails[0].value,
          email: profile.emails[0].value,
          confirmed: true
        })
        done(null, newUser)
        return;
      }
  
      done(null, user);
    }
  ));

module.exports = passport
