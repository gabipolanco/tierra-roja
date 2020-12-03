exports.catchErrs = ctl => (req, res, next) => ctl(req, res).catch(next)

exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(403).json({
      message: 'You must login'
    })
  }
}

exports.checkRole = role => (req, res, next) => {
  if (role.includes(req.user.role)) {
      return next()
  } else {
      res.status(400).json({message: "You have to be an artist to get here"})
  }
}