const express= require('express')
const vOneAdvertsRouter = express.Router()
const vOneAdvertsController = require('../controllers/vOneAdvertsController')

vOneAdvertsRouter.get('/', vOneAdvertsController.readAllRequest)
vOneAdvertsRouter.get('/read/', vOneAdvertsController.readOneRequest)
vOneAdvertsRouter.post('/create/', vOneAdvertsController.createOneRequest)

module.exports = vOneAdvertsRouter
