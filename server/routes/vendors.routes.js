'use strict'

const router = require('express').Router()
const controller = require('../controllers/vendors.controller')

router.get('/', controller.index)

router.get('/:id', controller.retrieve)

router.post('/', controller.create)

router.patch('/:id', controller.update)

router.delete('/:id', controller.delete)

module.exports = router
