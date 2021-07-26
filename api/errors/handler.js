const errorHandler = function(err, req, res, next) {
    console.log('err.name')
    console.log(err.name)
    switch (err.name) {
      case 'UnauthorizedError':
        return res.status(401).json({message: `${err.name}: ${err.message}`})
      case 'ValidationError':
        return res.status(400).send(err)
      case 'JsonSchemaValidationError':
        return res.status(400).json(err)
      default:
        console.log('default')
        console.log(next)
        next()
        // break;
    }
  }

  module.exports = errorHandler