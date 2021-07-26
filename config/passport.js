const passport = require('passport')
const LocalStrategy = require('passport-local')
const mongoose = require('mongoose')
const User = mongoose.model('User')

const strategyConfigs = {
    usernameField: 'email'
}

verifyFunc = async (username, password, done) => {
    try {
        const user = await User.findOne({email: username}).exec()
        if(!user)
            return done(null, false, {message: 'Incorrect username and/or passwrod'})
        
        if(!user.passwordIsValid(password))
            return done(null, false, {message: 'Incorrect username and/or password'})
        
        return done(null, user)
    } catch (err) {
        console.log('Login Error: verifyFun in passport.js')
        console.log(err)
        return done(err)
    }

}

passport.use(new LocalStrategy(strategyConfigs, verifyFunc))