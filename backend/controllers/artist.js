const User = require('../models/User')
const Work = require('../models/Work')
const Artist = require('../models/Artist')

exports.createArtist = async (req, res) => {
    const { name, bio } = req.body
    const userId = req.user.id
    const newArtist = await Artist.create({name, userId, bio})
    res.status(201).json({message: "Artist created"}, newArtist)
}

exports.editArtist = async (req, res) => {
    const artistId = req.params.id
    const userId = req.user.id
    const { name, profession, coverImage, instagram, facebook, twitter, other, bio } = req.body
    const editedArtist = await Artist.findByIdAndUpdate(artistId, {name, userId, profession, bio, coverImage, instagram, facebook, twitter, other}, {new: true})
    res.status(200).json({message: "Artist edited"}, editedArtist)
}

exports.getArtist = async (req, res) => {
    const userId = req.user.id
    const {artistId} = await User.findById(userId)
    const myArtist = await Artist.findById(artistId)
    res.status(200).json(myArtist)

}

exports.delteArtist = async (req, res) => {
    const artistId = req.params.id
    await Artist.findByIdAndDelete(artistId)
    res.status(200).json({message: "artist deleted"})
}
