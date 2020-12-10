import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development' ?
  'http://localhost:3000/streaming' :
  '/streaming'

const streamingService = axios.create({
  baseURL,
  withCredentials: true
})

export const createStreamingFn = streamingInfo => streamingService.post('/create', streamingInfo)
export const editStreamingFn = (id, streamingInfo) => streamingService.post(`/edit/${id}`, streamingInfo)
export const getMyStreamingsFn = () => streamingService.get('/getmystreamings')
export const getOneStreamingFn = (streamingId) => streamingService.get(`/get/${streamingId}`)
export const getAllStreamingsFn = () => streamingService.get('/getall')
export const deleteStreamingFn = (id) => streamingService.get(`/delete/${id}`)