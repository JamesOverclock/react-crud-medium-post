/**
 * Main application routes
 */

'use strict'

const VerifyToken = require('../middleware/verifyToken')

module.exports = app => {
  app.use('/api/v1/auth', require('./auth.routes'))
  app.use('/api/v1/vendors', VerifyToken, require('./vendors.routes'))
}
