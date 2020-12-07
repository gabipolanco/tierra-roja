const express = require('express');
const router  = express.Router();
const { isAuth, catchErrs, checkRole } = require('../middlewares')
const {
   createStreaming,
   editStreaming,
   getMyStreamings,
   getOneStreaming,
   delteStreaming
} = require('../controllers/streaming')

router.post('/create', isAuth, checkRole("artist"), catchErrs(createStreaming))
router.post('/edit/:id', isAuth, catchErrs(editStreaming))
router.get('/getmystreamings', isAuth, catchErrs(getMyStreamings))
router.get('/get/:id', isAuth, catchErrs(getOneStreaming))
router.get('/delete/:id', isAuth, catchErrs(delteStreaming))

module.exports = router;