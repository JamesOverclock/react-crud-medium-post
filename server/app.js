/**
 * Main application file
 */

'use strict'

// Set default node environment to development

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const express = require('express')
const config = require('./config/environment')
const mongoose = require('mongoose')

// Connect to database
mongoose.Promise = global.Promise
mongoose
  .connect(config.db.URI, config.mongo.options)
  .then(() => {
    console.log('MongoDB connection success')
  })
  .catch(error => {
    console.log('MongoDB connection error: ' + error)
    process.exit(-1)
  })

const app = express()
const server = require('http').createServer(app)
require('./config/express')(app)
require('./routes')(app)
require('./config/seed')

// Start server
server.listen(config.port, config.ip, function() {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'))
})

// Expose app
exports = module.exports = app
