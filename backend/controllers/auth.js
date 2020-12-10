const bcrypt = require('bcrypt')
const User = require('../models/User')
const passport = require('../config/passport')
const { emailConfirmacion } = require('../config/nodemailer')

exports.loginProcess = (req, res, next) => {
    passport.authenticate('local', (err, user, failureDetails) => {
      if (err) {
        return res.status(500).json({ message: 'Something went wrong authenticating user' })
      }
      if (!user) {
        return res.status(401).json(failureDetails)
      }
  
      req.login(user, err => {
        if (err) {
          return res.status(500).json({ message: 'Something went wrong authenticating user' })
        }
        user.password = null
        res.status(200).json(user)
      })
    })(req, res, next)
  }

exports.signupProcess = async (req, res) => {
        const {email, password } = req.body
        if (!email || !password) {
            return res.status(406).json({
               message: "Indicate email and password"
            })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(406).json({
                message: "Error"
            })
        }
        const salt = bcrypt.genSaltSync(12)
        const hashPass = bcrypt.hashSync(password, salt)
        const newUser = await User.create({
            username: email,
            email,
            password: hashPass
        })
        const id = newUser._id.toString()
        await emailConfirmacion(email, id)
        res.status(201).json({message: "User created"})
}

exports.confirmSignup = async (req, res, next) => {
  const {email, id} = req.params
  const user = await User.findOne({email})
  if(!user) return res.status(404).json({message: "user not found"})
  if(id !== user._id.toString()) return res.status(400).json({message: "Confirm your email"})
  await User.findByIdAndUpdate(user._id, {confirmed: true}, {new: true})
  res.redirect(process.env.FRONTENDPOINT + "/confirmed")
}

exports.editProcess = async (req, res) => {
    let pass
    const id = req.params.id
    let { password } = await User.findById(id)
    const {username, email, role, confirm } = req.body
    if (!confirm) pass = password
    const editedUser = await User.findByIdAndUpdate(id, { username, email, password: pass, role }, {new: true})
    return res.status(202).json({message: "User updated", editedUser})
}

exports.uploadProcess = async (req, res) => {
  const id = req. params.id
  const {image} = req.body
  const editedUser = await User.findByIdAndUpdate(id, {image}, {new: true})
  return res.status(202).json({message: "User updated", editedUser})
}

exports.logoutProcess = (req, res) => {
    req.logout()
    res.status(200).json({message: "User logged out"}) 
}

exports.loggedinProcess = (req, res) => {
    return res.status(200).json(req.user || null)
}

exports.googleProcess =  passport.authenticate("google", { scope: ["profile", "email"] })

exports.googleRedirect = (req, res, next) => {
    passport.authenticate("google", { scope: ["email"] }, (err, user, info) => {
        if (err) return res.status(500).json({ err, info })
        if (!user) return res.status(401).json({ err, info })
        req.login(user, error => {
            if (error) return res.status(401).json({ error })
            return res.redirect(process.env.FRONTENDPOINT)
        })
    })(req, res, next)
}

// exports.facebookProcess =  passport.authenticate("facebook", { scope: [ "email"] })

// exports.facebookRedirect = (req, res, next) => {
//     passport.authenticate("facebook", { scope: ["email"] }, (err, user, info) => {
//         if (err) return res.status(500).json({ err, info })
//         if (!user) return res.status(401).json({ err, info })
//         req.login(user, error => {
//             if (error) return res.status(401).json({ error })
//             return res.redirect(process.env.FRONTENDPOINT + "/profile")
//         })
//     })(req, res, next)
// }