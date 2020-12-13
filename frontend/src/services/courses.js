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

export const addClassFn = (courseId, classInfo) => courseService.post(`/addclass/${courseId}`, classInfo)
export const getOneClassFn = (id) => courseService.get(`/getclass/${id}`)
export const editClassFn = (id, classInfo) => courseService.post(`/editclass/${id}`, classInfo)
export const deleteClassFn = (courseId, id) => courseService.get(`/deleteclass/${courseId}/${id}`)