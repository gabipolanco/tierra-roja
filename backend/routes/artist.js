const express = require('express');
const router  = express.Router();
const { isAuth, catchErrs, checkRole } = require('../middlewares')
const {
   createArtist,
   editArtist,
   getArtist,
   delteArtist
} = require('../controllers/artist')

router.post('/create', isAuth, checkRole("artist"), catchErrs(createArtist))
router.post('/edit/:id', isAuth, checkRole("artist"), catchErrs(editArtist))
router.get('/get', isAuth, checkRole("artist"), catchErrs(getArtist))
router.get('/delete/:id', isAuth, checkRole("artist"), catchErrs(delteArtist))

module.exports = router;