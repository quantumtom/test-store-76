const express= require('express')
const vOneAdvertsRouter = express.Router()
const vOneAdvertsController = require('../controllers/vOne.adverts.controller')

vOneAdvertsRouter.get('/', vOneAdvertsController.readAllRequest)
vOneAdvertsRouter.post('/', vOneAdvertsController.createOneRequest)

module.exports = vOneAdvertsRouter
