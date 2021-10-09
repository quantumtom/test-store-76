const express = require('express')
const advertsRouter = express.Router()
const advertsController = require("../controllers/adverts.controller")

advertsRouter.get('/', advertsController.readAllRequest)
advertsRouter.post('/', advertsController.createOneRequest)
advertsRouter.get('/:id', advertsController.readOneRequest)
advertsRouter.put('/:id', advertsController.updateOneRequest)
advertsRouter.delete('/:id', advertsController.deleteOneRequest)

module.exports = advertsRouter
