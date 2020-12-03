const express = require('express');
const router  = express.Router();
const { isAuth, catchErrs } = require('../middlewares')
const {
    loginProcess,
    signupProcess,
    editProcess,
    logoutProcess,
    loggedinProcess
} = require('../controllers/auth')

router.post('/login', catchErrs(loginProcess))
router.post('/signup', catchErrs(signupProcess))
router.post('/edit/:id',isAuth, catchErrs(editProcess))
router.get('/logout', catchErrs(logoutProcess))
router.get('/loggedin', loggedinProcess)

module.exports = router;