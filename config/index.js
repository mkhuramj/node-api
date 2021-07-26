/**
 * Loading validator config
 */
 require('./validator')

 /**
  * Loading mongo db config
  */
 require('./db')
 
 /**
  * Loading passport config
  */
 require('./passport')
 
 const winstonObj = require('./winston')

 module.exports = {
     winston: winstonObj
 }