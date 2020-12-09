import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development' ?
  'http://localhost:3000/course' :
  '/course'

const courseService = axios.create({
  baseURL,
  withCredentials: true
})

export const createCourseFn = courseInfo => courseService.post('/create', courseInfo)
export const editCourseFn = (id, courseInfo) => courseService.post(`/edit/${id}`, courseInfo)
export const getMyCoursesFn = () => courseService.get('/getmycourses')
export const getAllCoursesFn = () => courseService.get('/getallcourses')
export const getOneCourseFn = (id) => courseService.get(`/get/${id}`)
export const deleteCourseFn = (id) => courseService.get(`/delete/${id}`)

export const addClassFn = (courseId) => courseService.post(`/addclass/${courseId}`)
export const editClassFn = (courseId, id) => courseService.post(`/editclass/${courseId}/${id}`)
export const deleteClassFn = (courseId, id) => courseService.post(`/deleteclass/${courseId}/${id}`)