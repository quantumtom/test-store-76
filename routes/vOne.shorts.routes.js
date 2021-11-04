const express= require('express')
const vOneShortsRouter = express.Router()
const vOneShortsController = require('../controllers/vOne.shorts.controller')

vOneShortsRouter.get('/', vOneShortsController.readAllRequest)
vOneShortsRouter.post('/', vOneShortsController.createOneRequest)

module.exports = vOneShortsRouter
