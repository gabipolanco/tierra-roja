const User = require('../models/User')
const Course = require('../models/Course')
const ClassModel = require('../models/ClassModel')
const Streaming = require('../models/Streaming')
const mongoose = require('mongoose');

exports.createCourse = async (req, res) => {
    const { name, description, date } = req.body
    const userId = req.user.id
    const newCourse = await Course.create({name, description, date, userId})
    await User.findByIdAndUpdate(userId, { $push : { courses: newCourse._id } }, {new: true})
    res.status(201).json({message: "Course created", newCourse})
}

exports.editCourse = async (req, res) => {
    const courseId = req.params.id
    const { name, description, date } = req.body
    const userId = req.user.id
    const editedCourse = await Course.findByIdAndUpdate(courseId, { name, description, date}, {new: true})
    res.status(200).json({message: "Course edited", editedCourse})
}

exports.getAllCourses = async(req, res) => {
    const courses = await Course.find().populate({path: 'userId', populate: 'artistId'})
    res.status(200).json(courses)
}

exports.getMyCourses = async (req, res) => {
    const userId = req.user.id
    const { courses } = await User.findById(userId).populate({path: "courses", populate: "classes"})
    res.status(200).json(courses)
}

exports.getOneCourse = async (req, res) => {
    const courseId = req.params.id
    const oneCourse = await Course.findById(courseId).populate('classes')
    res.status(200).json(oneCourse)
}

exports.deleteCourse = async (req, res) => {
    const userId = req.user.id
    const courseId = req.params.id
    await Course.findByIdAndDelete(courseId)
    await User.findByIdAndUpdate(userId, { $pull : { courses: courseId } }, {new: true})
    res.status(200).json({message: "Course deleted"})
}

exports.addClass = async (req, res) => {
    const id = req.params.courseId
    const { name, description, contentLink, slideShowLink, video, hour } = req.body
    const newClass = await ClassModel.create({ name, description, contentLink, slideShowLink, video, hour })
    await Course.findByIdAndUpdate( id, { $push : { classes: newClass._id }}, {new: true})
    res.status(200).json({message: "Class added", newClass})
} 

exports.getOneClass = async (req, res) => {
    const {id} = req.params
    const oneClass = await ClassModel.findById(id)
    res.status(200).json(oneClass)
}

exports.editClass = async (req, res) => {
    const id = req.params.id
    const { name, description, contentLink, slideShowLink, video, hour } = req.body
    const editedClass = await ClassModel.findByIdAndUpdate(id, { name, description, contentLink, slideShowLink, video, hour }, {new: true})
    res.status(200).json({message: "Class edited", editedClass})
} 

exports.deleteClass = async (req, res) => {
    const classId = req.params.id
    const courseId = req.params.courseId
    await ClassModel.findByIdAndDelete(classId)
    await Course.findByIdAndUpdate(courseId, { $pull: {classes : classId }})
    res.status(200).json({message: "Class deleted"})
}

