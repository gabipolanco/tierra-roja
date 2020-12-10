const router = require('express').Router();
const { cartDetail } = require('../controllers/cart')

router.get('/', (req, res, next) => {
  res.status(200).send('index.html')
});

router.post('/cartdetails', cartDetail)

module.exports = router;
