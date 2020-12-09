import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development' ?
  'http://localhost:3000/artist' :
  '/artist'

const artistService = axios.create({
  baseURL,
  withCredentials: true
})

export const createArtistFn = artistInfo => artistService.post('/create', artistInfo)
export const editArtistFn = (id, artistInfo) => artistService.post(`/edit/${id}`, artistInfo)
export const getArtistFn = () => artistService.get('/get')
export const getOneArtistFn = (id) => artistService.get(`/getone/${id}`)
export const getAllArtistFn = () => artistService.get('/getall')
export const deleteArtistFn = (id) => artistService.get(`/delete/${id}`)