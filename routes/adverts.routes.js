const express = require('express')
const advertsRouter = express.Router()
const advertsController = require("../controllers/adverts.controller")

advertsRouter.get('/', advertsController.readListRequest)
advertsRouter.post('/', advertsController.createListRequest)

advertsRouter.post('/clips', advertsController.addItemRequest)
advertsRouter.put('/clips', advertsController.addItemRequest)
advertsRouter.put('/clips/:guid', advertsController.replaceItemRequest)
advertsRouter.get('/clips/:guid', advertsController.readItemRequest)
advertsRouter.delete('/clips/:guid', advertsController.deleteItemRequest)

module.exports = advertsRouter
