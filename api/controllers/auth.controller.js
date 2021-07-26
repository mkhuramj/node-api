const passport = require('passport')
const mongoose = require('mongoose')
const User = mongoose.model('User')


const register = async (req, res) => {
    // create user
    try {
        const user = new User()
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName
        user.email = req.body.email
        user.setPassword(req.body.password)
        user.save()
        return res.status(201).json(user.toJson())
    } catch (err) {
        console.log(err)
        if(err.code === 11000)
            return res.status(422).json({message: 'username/email has already been taken.'})
        return res.status(400).json(err)
    }
}

const login = async(req, res) => {
    if(!req.body.email || !req.body.password)
        return res.status(400).json({message: 'All fields are required.'})

    passport.authenticate('local', (err, user, info) => {
        let token;

        if(err)
            return res.status(404).json(err)

        if(user)
            token = user.generateJwt()
        else
            return res.status(401).json(info)

        return res.status(200).json({token})
    })(req, res)
}

module.exports = {
    register,
    login
}