const User = require('../models/User')
const Work = require('../models/Work')
const Artist = require('../models/Artist')

exports.createWork = async (req, res) => {
    const { title, media, description } = req.body
    const userId = req.user.id
    const {artistId} = await User.findById(userId)
    if (!artistId) return
    const newWork = await Work.create({title, media, artistId, description})
    res.status(201).json({message: "Work created"}, newWork)
}

exports.editWork = async (req, res) => {
    const workId = req.params.id
    const { workType, title, media, description, price } = req.body
    const userId = req.user.id
    const {artistId} = await User.findById(userId)
    const editedWork = await Work.findByIdAndUpdate(workId, { workType, title, media, artistId, description, price}, {new: true})
    res.status(200).json({message: "Work edited"}, editedWork)
}

exports.getAllWorks = async (req, res) => {
    const userId = req.user.id
    const {artistId} = await User.findById(userId)
    const {works} = await Artist.findById(artistId).populate("works")
    res.status(200).json(works)

}

exports.delteWork = async (req, res) => {
    const workId = req.params.id
    await Work.findByIdAndDelete(workId)
    res.status(200).json({message: "work deleted"})
}
