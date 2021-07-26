const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

/**
 * Options
 */
 const options = {
    timestamps: true
}

/**
 * Schema
 */
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    hash: String,
    salt: String,
    status: {
        type: String,
        default: 'inactive',
        enum: ['active', 'inactive', 'resigned', 'suspended', 'retired', 'died', 'terminated']
    },
}, options)

/**
 * Methods
 */
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
}

userSchema.methods.passwordIsValid = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
    return this.hash === hash
}

userSchema.methods.generateJwt = function() {
    const expiry = new Date()
    expiry.setDate(expiry.getDate() + 7)

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000, 10)
    }, 'process.env.JWT_SECRET')
}

userSchema.methods.toJson = function() {
    const obj = this.toObject()
    delete obj.hash
    delete obj.salt
    return obj
}
/**
 * Virtuals
 */
// No virtuals

mongoose.model('User', userSchema)