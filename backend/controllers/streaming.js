const User = require('../models/User')
const Streaming = require('../models/Streaming')
const axios = require('axios')

exports.createStreaming = async (req, res) => {
    const { title, description, hour, type } = req.body
    const userId = req.user.id
    const { data: { data: {stream_key, playback_ids, id} }} = await axios.post("https://api.mux.com/video/v1/live-streams", {
        "playback_policy": "public",
        "new_asset_settings": {
          "playback_policy": "public"
        }
      }, { auth: {
          username: process.env.MUX_TOKEN_ID,
          password: process.env.MUX_TOKEN_SECRET
      }})
    const newStreaming = await Streaming.create({title, description, hour, streamKey: stream_key, streamId: id, playbackId: playback_ids[0].id, type})
    await User.findByIdAndUpdate(userId, { $push : { streamings: newStreaming._id } }, {new: true})
    res.status(201).json({message: "Streaming created", newStreaming})
}

exports.editStreaming = async (req, res) => {
    const id = req.params.id
    const { title, description, hour, type } = req.body
    const editedStreaming = await Streaming.findByIdAndUpdate(id, { title, description, hour, type}, {new: true})
    res.status(200).json({message: "Streaming edited", editedStreaming})
}

exports.getMyStreamings = async (req, res) => {
    const userId = req.user.id
    const { streamings } = await User.findById(userId).populate("streamings")
    res.status(200).json(streamings)
}

exports.getOneStreaming = async (req, res) => {
    const { id } = req.params
    const oneStreaming = await Streaming.findById(id)
    res.status(200).json(oneStreaming)
}

exports.delteStreaming = async (req, res) => {
    const userId = req.user.id
    const streamingId = req.params.id
    await Streaming.findByIdAndDelete(streamingId)
    await User.findByIdAndUpdate(userId, { $pull : { streamings: streamingId } }, {new: true})
    res.status(200).json({message: "Streaming deleted"})
}
