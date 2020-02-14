const express = require('express')
const app = express()
const logger = require('morgan') // It is a http request logger which print in the terminal all the request that the server will receive
const v1 = require('./v1')

/**
* Ensure JSON acceptance
 */
app.use((req, res, next) => {
  let err

  if (!req.accepts('json')) {
    err = new Error('Not acceptable')
    err.status = 406
  }
  return next(err)
})

/**
 *  Middlewares
 */
app.use(logger('dev'))

/**
 * Routes
 */
app.use('/v1', v1)

/**
 * ErrorHandler
*/

app.use((err, req, res, next) => {
  res.status(err.status || 500)
    .json({
      message: err.message,
      stack: err.stack
    })
})

module.exports = app
