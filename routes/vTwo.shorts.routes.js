const express = require('express')
const shortsRouter = express.Router()
const shortsController = require("../controllers/vTwo.shorts.controller")

shortsRouter.get('/', shortsController.readAllRequest)
shortsRouter.post('/', shortsController.createOneRequest)

shortsRouter.get('/:id', shortsController.readOneRequest)
shortsRouter.put('/:id', shortsController.updateOneRequest)
shortsRouter.delete('/:id', shortsController.deleteOneRequest)

module.exports = shortsRouter
