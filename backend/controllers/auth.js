const bcrypt = require('bcrypt')
const User = require('../models/User')
const passport = require('passport')
const { emailConfirmacion } = require('../config/nodemailer')

exports.loginProcess = async (req, res, next) => {
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
                errorMessage: "Indicate email and password"
            })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(406).json({
                errorMessage: "Error"
            })
        }
        const salt = bcrypt.genSaltSync(12)
        const hashPass = bcrypt.hashSync(password, salt)
        const newUser = await User.create({
            username: email,
            email,
            password: hashPass
        })
        const hashId = bcrypt.hashSync(newUser._id.toString(), salt)
        await emailConfirmacion(email, hashId)
        res.status(201).json({message: "User created"})
}

exports.confirmSignup = async (req, res) => {
  const {email, id} = req.params
  const user = await User.findOne({email: email})
  if(!user) return res.status(404).json({message: "user not found"})
  if(!bcrypt.compareSync(user._id.toString(), id)) return res.status(400).json({message: "Confirm your email"})
  await User.findByIdAndUpdate(user._id, {confirmed: true}, {new: true})
  res.redirect("http://localhost:3001")
}

exports.editProcess = async (req, res) => {
    const id = req.params.id
    let { password } = await User.findById(id)
    const {username, email, role, confirm } = req.body
    if (confirm !== "undefined") {
      password = confirm
    }
    const editedUser = await User.findByIdAndUpdate(id, { username, email, password, role }, {new: true})
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
    return res.json(req.user || null)
}