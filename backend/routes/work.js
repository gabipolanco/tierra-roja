const express = require('express');
const router  = express.Router();
const { isAuth, catchErrs, checkRole } = require('../middlewares')
const {
   createWork,
   editWork,
   getAllMyWorks,
   getAllWorks,
   getOneWork,
   delteWork,
   addWorkToCart,
   changeProductQty,
   removeWorkFromCart,
   getMyCart
} = require('../controllers/work')

router.post('/create', isAuth, checkRole("artist"), catchErrs(createWork))
router.post('/edit/:id', isAuth, checkRole("artist"), catchErrs(editWork))
router.get('/getmine', catchErrs(getAllMyWorks))
router.get('/getall', catchErrs(getAllWorks))
router.get('/get/:workId', catchErrs(getOneWork))
router.get('/delete/:id', isAuth, checkRole("artist"), catchErrs(delteWork))

router.get('/addtocart/:id', catchErrs(addWorkToCart))
router.get('/editqty/:id/:qty', catchErrs(changeProductQty))
router.get('/removefromcart/:id', catchErrs(removeWorkFromCart))
router.get('/getmycart', catchErrs(getMyCart))

module.exports = router;