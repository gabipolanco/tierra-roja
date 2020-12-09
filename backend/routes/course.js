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
   editClass,
   deleteClass
} = require('../controllers/courses')

router.post('/create', isAuth, checkRole("artist"), catchErrs(createCourse))
router.post('/edit/:id', isAuth, catchErrs(editCourse))
router.get('/getmycourses', isAuth, catchErrs(getMyCourses))
router.get('/getallcourses', isAuth, catchErrs(getAllCourses))
router.get('/get/:id', isAuth, catchErrs(getOneCourse))
router.get('/delete/:id', isAuth, catchErrs(deleteCourse))

router.post('/addclass/:courseId', isAuth, checkRole("artist"), catchErrs(addClass))
router.post('/editclass/:courseId/:id', isAuth, catchErrs(editClass))
router.post('/deleteclass/:courseId/:id', isAuth, catchErrs(deleteClass))

module.exports = router;