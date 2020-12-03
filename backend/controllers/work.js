const User = require('../models/User')
const Work = require('../models/Work')
const Artist = require('../models/Artist')

exports.createWork = async (req, res) => {
    const { title, media, description } = req.body
    const userId = req.user.id
    const {artistId} = await User.findById(userId)
    if (!artistId) return
    const newWork = await Work.create({title, media, artistId, description})
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

exports.getAllWorks = async (req, res) => {
    const userId = req.user.id
    const { artWork } = await User.findById(userId).populate("artWork")
    res.status(200).json(artWork)

}

exports.delteWork = async (req, res) => {
    const userId = req.user.id
    const workId = req.params.id
    await Work.findByIdAndDelete(workId)
    await User.findByIdAndUpdate(userId, { $pull : { artWork: workId } }, {new: true})
    res.status(200).json({message: "work deleted"})
}
