const mongoose = require('mongoose')
const User = mongoose.model('User')

/**
 * "List" all the users (with pagination)
 */
const list = async (req, res) => {
    const page = req.body.page ? req.body.page : 0
    const limit = 15

    const users = await User.find({})
                            .sort('-createdAt')
                            .skip(page * limit)
                            .limit(limit)
                            .exec()

    return res.status(200).json({success: true, data: users, total: 20})
}

/**
 * "Create" the user with the given information
 */
const create = async (req, res) => {
    return res.status(500).send({message: 'You need to implement this method'})
}

/**
 * "View" the details of the requested user
 */
const view = async (req, res) => {
    try {
        const user = await User.findById({_id: req.params.userId}).exec()
        return res.status(200).json(user)
    } catch (err) {
        // for dev environment only, other wise, don't send the whole err object
        console.log(err)
        return res.status(err.status).json(err)
    }

}

/**
 * Update the requested user
 */
const update = async (req, res) => {
    return res.status(500).send({message: 'You need to implement this method'})
}

/**
 * Delete the requested user
 */
const destroy = async (req, res) => {
    return res.status(500).send({message: 'You need to implement this method'})
}

/**
 * Exporting
 */
module.exports = {
    list,
    create,
    view,
    update,
    destroy
}