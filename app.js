// require('dotenv').load()
const express = require('express');
const logger = require('morgan');
const passport = require('passport')
const cors = require('cors')

/**
 * Loading configurations
 */
require('./config/index')

/**
 * Loading mongoose models
 */
require('./api/models/index')

/**
 * Loading error handler
 */
const errorHandler = require('./api/errors/handler')


const app = express();

// here we are adding middleware to allow cross-origin requests
app.use(cors());

// here we are adding middleware to parse all incoming requests as JSON 
app.use(express.json())

// here we are initializing passport for the auth
app.use(passport.initialize())

// using and configuring the ExpressWinston logger
// app.use(winston);

// using and configuring the Morgan logger
app.use(logger('dev'))

/**
 * Routes
 */
const apiV1Router = require('./api/routes/api.v1');
app.use('/api/v1', apiV1Router);
// app.use('/api/v2', apiV2Router); // could be used if you have version 2 of your API

// error handler
app.use(errorHandler);

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
