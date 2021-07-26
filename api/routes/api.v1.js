const express = require('express')
const router = express.Router()
const jwt = require('express-jwt')

const UserController = require('../controllers/user.controller')
const AuthController = require('../controllers/auth.controller')
const AuthValidator = require('../validators/auth.validator')
const UserValidator = require('../validators/user.validator')
const validate = require('../../config/validator')


const auth = jwt({
      secret: 'process.env.JWT_SECRET',
      requestProperty: 'user',
      algorithms: ['HS256']
})

router.get('/', (req, res) => res.status(200).json({khuram: 'Home for Express API V1'}))
/**
 * Authentication Routes
 */

router.post('/register', validate({body: AuthValidator.register}), AuthController.register)
router.post('/login', validate({body: AuthValidator.login}), AuthController.login)


/**
 * User's Routes
 */
router.route('/users')
      .all(auth)
      .get(UserController.list)
      .post(validate({body: UserValidator.create}))


router.route('/users/:userId')
      .all(auth)
      .get(UserController.view)
      .put(UserController.update)
      .delete(UserController.destroy)


module.exports = router