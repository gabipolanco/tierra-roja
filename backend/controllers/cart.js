const mp = require('../config/mercadopago')

exports.cartDetail = async (req, res) => {
   console.log( req.body)
  const cart = {
    title: 'Mi carrito',
    unit_price: 100,
    quantity: 1,
  }
  let preference = {
    items: [
      cart
    ],
   "back_urls": {
      "success": "http://localhost:3001/success",
      "failure": "http://localhost:3001/failure",
      "pending": "http://localhost:3001/pending"
    }
  };

  const { body: { id } } = await mp.preferences.create(preference)
  cart.prefId = id
  res.status(200).json(cart)
}