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
export const getWorksFn = () => workService.get('/get')
export const getOneWorkFn = (workId) => workService.get(`/get/${workId}`)
export const deleteWorkFn = (id) => workService.get(`/delete/${id}`)