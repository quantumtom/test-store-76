const express= require('express')
const vOneAdvertsRouter = express.Router()
const vOneAdvertsController = require('../controllers/vOneAdvertsController')

vOneAdvertsRouter.get('/', vOneAdvertsController.readAllRequest)
vOneAdvertsRouter.post('/', vOneAdvertsController.createOneRequest)

module.exports = vOneAdvertsRouter
