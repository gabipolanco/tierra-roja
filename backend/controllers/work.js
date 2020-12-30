const User = require('../models/User')
const Work = require('../models/Work')
const Artist = require('../models/Artist')

exports.createWork = async (req, res) => {
    const { workType, title, media, description, price, qty } = req.body
    const userId = req.user.id
    let {artistId} = await User.findById(userId)
    if (!artistId) {
        const newWork = await Work.create({workType, title, media, description, price, qty})
        await User.findByIdAndUpdate(userId, { $push : { artWork: newWork._id } }, {new: true})
        return res.status(201).json({message: "Work created", newWork})
    }
    const newWork = await Work.create({workType, title, media, artistId, description, price, qty})
    await User.findByIdAndUpdate(userId, { $push : { artWork: newWork._id } }, {new: true})
    res.status(201).json({message: "Work created", newWork})
}

exports.editWork = async (req, res) => {
    const workId = req.params.id
    const { workType, title, media, description, price, qty } = req.body
    const userId = req.user.id
    const {artistId} = await User.findById(userId)
    const editedWork = await Work.findByIdAndUpdate(workId, { workType, title, media, artistId, description, price, qty}, {new: true})
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
    const user = await User.findById(userId)
    const originalProduct = await Work.findById(id)

    const product = user.cart.find(p => p.product.toString() === id)
    if (product === undefined) {
        await User.findByIdAndUpdate(userId, { $push : { cart: {product: id} } }, {new: true})
        return res.status(201).json({message: "Product added"})
    } else {
        const newCart = user.cart.map(p => {
            if (p.product.toString() === id && p.qty < originalProduct.qty) {
                p.qty += 1
                return p 
            }
            return p
        })
        await User.findByIdAndUpdate(userId, { cart: newCart }, {new: true})
        return res.status(201).json({message: "Product added"})
    }
}

exports.changeProductQty = async (req, res) => {
    const userId = req.user.id
    const { id, qty } = req.params
    const user = await User.findById(userId)

    const newCart = user.cart.map(p => {
        if (p._id.toString() === id) {
            p.qty = qty
            return p 
        }
        return p
    })
    await User.findByIdAndUpdate(userId, { cart: newCart }, {new: true})
    return res.status(200).json({message: "Product edited"})
}

exports.removeWorkFromCart = async (req, res) => {
    const userId = req.user.id
    const { id } = req.params
    await User.findByIdAndUpdate(userId, { $pull : { cart: {_id: id} } }, {new: true})
    res.status(201).json({message: "Product removed"})
}

exports.getMyCart = async (req, res) => {
    const userId = req.user.id
    const {cart} = await User.findById(userId).populate('cart.product')
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
