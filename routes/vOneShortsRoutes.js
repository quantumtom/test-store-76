const express= require('express')
const vOneShortsRouter = express.Router()
const vOneShortsController = require('../controllers/vOneShortsController')

vOneShortsRouter.get('/', vOneShortsController.readAllRequest)
vOneShortsRouter.post('/create/', vOneShortsController.createOneRequest)

module.exports = vOneShortsRouter
