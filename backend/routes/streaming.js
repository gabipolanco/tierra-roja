const express = require('express');
const router  = express.Router();
const { isAuth, catchErrs, checkRole } = require('../middlewares')
const {
   createStreaming,
   editStreaming,
   getMyStreamings,
   getOneStreaming,
   getAllStreamings,
   delteStreaming
} = require('../controllers/streaming')

router.post('/create', isAuth, checkRole("artist"), catchErrs(createStreaming))
router.post('/edit/:id', isAuth, catchErrs(editStreaming))
router.get('/getmystreamings', isAuth, catchErrs(getMyStreamings))
router.get('/get/:id', catchErrs(getOneStreaming))
router.get('/getall', catchErrs(getAllStreamings))
router.get('/delete/:id', isAuth, catchErrs(delteStreaming))

module.exports = router;