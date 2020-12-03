const express = require('express');
const router  = express.Router();
const { isAuth, catchErrs } = require('../middlewares')
const {
    loginProcess,
    signupProcess,
    uploadProcess,
    editProcess,
    logoutProcess,
    loggedinProcess
} = require('../controllers/auth')

router.post('/login', catchErrs(loginProcess))
router.post('/signup', catchErrs(signupProcess))
router.post('/upload',isAuth, catchErrs(uploadProcess))
router.post('/edit/:id',isAuth, catchErrs(editProcess))
router.get('/logout', catchErrs(logoutProcess))
router.get('/loggedin', catchErrs(loggedinProcess))

module.exports = router;