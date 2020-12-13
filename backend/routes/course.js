const express = require('express');
const router  = express.Router();
const { isAuth, catchErrs, checkRole } = require('../middlewares')
const {
   createCourse,
   editCourse,
   getMyCourses,
   getAllCourses,
   getOneCourse,
   deleteCourse,
   addClass,
   getOneClass,
   editClass,
   deleteClass
} = require('../controllers/courses')

router.post('/create', isAuth, checkRole("artist"), catchErrs(createCourse))
router.post('/edit/:id', isAuth, catchErrs(editCourse))
router.get('/getmycourses', isAuth, catchErrs(getMyCourses))
router.get('/getallcourses', catchErrs(getAllCourses))
router.get('/get/:id', isAuth, catchErrs(getOneCourse))
router.get('/delete/:id', isAuth, catchErrs(deleteCourse))

router.post('/addclass/:courseId', isAuth, checkRole("artist"), catchErrs(addClass))
router.get('/getclass/:id', isAuth, catchErrs(getOneClass))
router.post('/editclass/:id', isAuth, catchErrs(editClass))
router.get('/deleteclass/:courseId/:id', isAuth, catchErrs(deleteClass))

module.exports = router;