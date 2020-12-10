import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development' ?
  'http://localhost:3000/' :
  '/'

const cartService = axios.create({
  baseURL,
  withCredentials: true
})

export const getCartFn = (totalPrice) => cartService.post('/cartdetails', totalPrice)