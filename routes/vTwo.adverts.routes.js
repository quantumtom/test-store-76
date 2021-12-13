const express = require('express')
const advertsRouter = express.Router()
const advertsController = require("../controllers/vTwo.adverts.controller")

advertsRouter.get('/', advertsController.readListRequest)
advertsRouter.get('/:guid', advertsController.readItemRequest)

advertsRouter.post('/', advertsController.createListRequest)
advertsRouter.post('/clips', advertsController.addItemRequest)

advertsRouter.put('/clips/:guid', advertsController.replaceItemRequest)
advertsRouter.delete('/clips/:guid', advertsController.deleteItemRequest)

module.exports = advertsRouter
