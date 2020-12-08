const bcrypt = require("bcrypt")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const googleStrategy = require("passport-google-oauth20").Strategy
const FacebookStrategy = require("passport-facebook").Strategy
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

  passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
    async (_, __, { id, emails, photos }, done) => {
      const user = await User.findOne({ googleID: id })
  
      if (!user) {
        const newUser = await User.create({
          googleID: id,
          username: emails[0].value,
          email: emails[0].value,
          image: photos[0].value,
          confirmed: true
        })
        done(null, newUser)
        return;
      }
  
      done(null, user);
    }
  ));

  passport.use(
    new FacebookStrategy({
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK,
      profileFields: ["id", "displayName", "photos", "email"]
    },
    async (_, __, profile, done) => {
      const user = await User.findOne({facebookId: profile.id })
      console.log(user)
      if (!user){
        const user = await User.create({
          username: profile.displayName,
          email: profile.emails[0].value,
          facebookId: profile.id,
          image: profile.photos[0].value
        })
      done(null, user)
      }
      done(null, user)
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

module.exports = passport
