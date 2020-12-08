const User = require('../models/User')
const Work = require('../models/Work')
const Artist = require('../models/Artist')

exports.createArtist = async (req, res) => {
    const { name, profession, coverImage, instagram, facebook, email, other, bio } = req.body
    const userId = req.user.id
    const newArtist = await Artist.create({name, userId, profession, coverImage, socialMedia : {instagram, facebook, email, other}, bio})
    await User.findByIdAndUpdate(userId, {artistId: newArtist._id}, {new: true})
    return res.status(200).json({message: "Artist created", newArtist} )
}

exports.editArtist = async (req, res) => {
    const artistId = req.params.id
    const userId = req.user.id
    const { name, profession, coverImage, instagram, facebook, email, other, bio } = req.body
    const editedArtist = await Artist.findByIdAndUpdate(artistId, {name, userId, profession, bio, coverImage, socialMedia : {instagram, facebook, email, other}}, {new: true})
    return res.status(200).json({message: "Artist edited", editedArtist})
}

exports.getArtist = async (req, res) => {
    const userId = req.user.id
    const {artistId} = await User.findById(userId)
    const myArtist = await Artist.findById(artistId)
    return res.status(200).json(myArtist)

}

exports.delteArtist = async (req, res) => {
    const artistId = req.params.id
    await Artist.findByIdAndDelete(artistId)
    return res.status(200).json({message: "artist deleted"})
}
