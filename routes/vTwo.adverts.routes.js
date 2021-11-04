const express = require('express')
const advertsRouter = express.Router()
const advertsController = require("../controllers/vTwo.adverts.controller")

advertsRouter.get('/', advertsController.readListRequest)
advertsRouter.post('/', advertsController.createListRequest)

advertsRouter.get('/:id', advertsController.readItemRequest)
advertsRouter.put('/:id', advertsController.replaceItemRequest)
advertsRouter.patch('/:id', advertsController.updateItemRequest)
advertsRouter.delete('/:id', advertsController.deleteItemRequest)

module.exports = advertsRouter
