const express = require('express')
const clipsRouter = express.Router()
const clipsController = require("../controllers/clips.controller")

clipsRouter.post('/clips', clipsController.addItemRequest)
clipsRouter.put('/clips', clipsController.addItemRequest)
clipsRouter.put('/clips/:guid', clipsController.replaceItemRequest)
clipsRouter.get('/clips/:guid', clipsController.readItemRequest)
clipsRouter.delete('/clips/:guid', clipsController.deleteItemRequest)

module.exports = clipsRouter
