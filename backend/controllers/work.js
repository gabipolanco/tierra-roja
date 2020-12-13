const User = require('../models/User')
const Work = require('../models/Work')
const Artist = require('../models/Artist')

exports.createWork = async (req, res) => {
    const { workType, title, media, description, price } = req.body
    const userId = req.user.id
    let {artistId} = await User.findById(userId)
    if (!artistId) {
        const newWork = await Work.create({workType, title, media, description, price})
        await User.findByIdAndUpdate(userId, { $push : { artWork: newWork._id } }, {new: true})
        return res.status(201).json({message: "Work created", newWork})
    }
    const newWork = await Work.create({workType, title, media, artistId, description, price})
    await User.findByIdAndUpdate(userId, { $push : { artWork: newWork._id } }, {new: true})
    res.status(201).json({message: "Work created", newWork})
}

exports.editWork = async (req, res) => {
    const workId = req.params.id
    const { workType, title, media, description, price } = req.body
    const userId = req.user.id
    const {artistId} = await User.findById(userId)
    const editedWork = await Work.findByIdAndUpdate(workId, { workType, title, media, artistId, description, price}, {new: true})
    res.status(200).json({message: "Work edited", editedWork})
}

exports.getAllMyWorks = async (req, res) => {
    const userId = req.user.id
    const { artWork } = await User.findById(userId).populate("artWork")
    res.status(200).json(artWork)
}

exports.getAllWorks = async (req, res) => {
    const works = await Work.find().populate('artistId')
    res.status(200).json(works)
}

exports.addWorkToCart = async (req, res) => {
    const userId = req.user.id
    const { id } = req.params
    await User.findByIdAndUpdate(userId, { $push : { cart: id } }, {new: true})
    res.status(201).json({message: "Product added"})
}

exports.removeWorkFromCart = async (req, res) => {
    const userId = req.user.id
    const { id } = req.params
    await User.findByIdAndUpdate(userId, { $pull : { cart: id } }, {new: true})
    res.status(201).json({message: "Product removed"})
}

exports.getMyCart = async (req, res) => {
    const userId = req.user.id
    const {cart} = await User.findById(userId).populate('cart')
    res.status(200).json(cart)
}

exports.getOneWork = async (req, res) => {
    const {workId} = req.params
    const oneWork = await Work.findById(workId)
    res.status(200).json(oneWork)
}

exports.delteWork = async (req, res) => {
    const userId = req.user.id
    const workId = req.params.id
    await Work.findByIdAndDelete(workId)
    await User.findByIdAndUpdate(userId, { $pull : { artWork: workId } }, {new: true})
    res.status(200).json({message: "work deleted"})
}
