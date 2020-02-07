'use strict'

const path = require('path')
const _ = require('lodash')
const local = require('../local.env.js')

if (!process.env.NODE_ENV) {
  console.log('Environment Not Set. Please set NODE_ENV to development | test')
  requireProcessEnv(NODE_ENV)
  process.exit(2)
}

function requireProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

// All configurations will extend these options
// ============================================

let config = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 8000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  mongo: {
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },

  selfDomain: 'simple.com',
}

// Export the config object based on the NODE_ENV
// ==============================================

module.exports = _.merge(
  config,
  require('./' + process.env.NODE_ENV + '.js') || {},
  require('../local.env.js')
)
