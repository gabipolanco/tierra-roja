const express = require('express');
const router  = express.Router();
const { isAuth, catchErrs, checkRole } = require('../middlewares')
const {
   createWork,
   editWork,
   getAllWorks,
   getOneWork,
   delteWork
} = require('../controllers/work')

router.post('/create', isAuth, checkRole("artist"), catchErrs(createWork))
router.post('/edit/:id', isAuth, checkRole("artist"), catchErrs(editWork))
router.get('/get', isAuth, checkRole("artist"), catchErrs(getAllWorks))
router.get('/get/:workId', isAuth, checkRole("artist"), catchErrs(getOneWork))
router.get('/delete/:id', isAuth, checkRole("artist"), catchErrs(delteWork))

module.exports = router;