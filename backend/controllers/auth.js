const bcrypt = require('bcrypt')
const User = require('../models/User')
const passport = require('passport')

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
        await User.create({
            username: email,
            email,
            password: hashPass
        })
        res.status(201).json({message: "User created"})
}

exports.uploadProcess = (req, res) => {

}

exports.editProcess = async (req, res) => {
    id = req.params.id
    const {username } = req.body
    const {email, password} = await User.findById(id)
    await User.findByIdAndUpdate(id, { email, password, username }, {new: true})
    return res.status(202).json({message: "User updated"})
}

exports.logoutProcess = (req, res) => {
    req.logout()
    res.status(200).json({message: "User logged out"}) 
}

exports.loggedinProcess = (req, res) => {
    return res.json(req.user || null)
}