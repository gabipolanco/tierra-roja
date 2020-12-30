import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development' ?
  'http://localhost:3000/work' :
  '/work'

const workService = axios.create({
  baseURL,
  withCredentials: true
})

export const createWorkFn = workInfo => workService.post('/create', workInfo)
export const editWorkFn = (id, workInfo) => workService.post(`/edit/${id}`, workInfo)
export const getWorksFn = () => workService.get('/getmine')
export const getAllWorksFn = () => workService.get('/getall')
export const getOneWorkFn = (workId) => workService.get(`/get/${workId}`)
export const deleteWorkFn = (id) => workService.get(`/delete/${id}`)

export const addToCartFn = (id) => workService.get(`/addtocart/${id}`)
export const editProductQtyFn = (id, qty) => workService.get(`/editqty/${id}/${qty}`)
export const removeFromCartFn = (id) => workService.get(`/removefromcart/${id}`)
export const getMyCartFn = () => workService.get(`/getmycart`)