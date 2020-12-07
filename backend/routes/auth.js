const express = require('express');
const router  = express.Router();
const { isAuth, catchErrs } = require('../middlewares')
const {
    loginProcess,
    signupProcess,
    confirmSignup,
    editProcess,
    uploadProcess,
    logoutProcess,
    loggedinProcess,
    googleInit,
    googleCb
} = require('../controllers/auth')

router.post('/login', catchErrs(loginProcess))
router.post('/signup', catchErrs(signupProcess))
router.get('/:email/:id', catchErrs(confirmSignup))
router.post('/edit/:id',isAuth, catchErrs(editProcess))
router.post('/upload-photo/:id',isAuth, catchErrs(uploadProcess))
router.get('/logout', logoutProcess)
router.get('/loggedin', loggedinProcess)

router.get('/google', googleInit)
router.get('/google/callback', googleCb)

module.exports = router;