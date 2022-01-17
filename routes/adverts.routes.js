const express = require('express')
const path = require("path")
const advertsRouter = express.Router()
const advertsPath = path.resolve(__dirname, "../data/adverts.json");
const clipsController = require("../controllers/clips.controller")

advertsRouter.get('/', (req, res) => {
  req.filePath = advertsPath;
  clipsController.readListRequest(req, res);
});

advertsRouter.post('/', (req, res) => {
  req.filePath = advertsPath;
  clipsController.createListRequest(req, res);
});

advertsRouter.post('/clips', (req, res) => {
  req.filePath = advertsPath;
  clipsController.addItemRequest(req, res);
});

advertsRouter.put('/clips', (req, res) => {
  req.filePath = advertsPath;
  clipsController.addItemRequest(req, res);
});

advertsRouter.put('/clips/:guid', (req, res) => {
  req.filePath = advertsPath;
  clipsController.replaceItemRequest(req, res);
});

advertsRouter.get('/clips/:guid', (req, res) => {
  req.filePath = advertsPath;
  clipsController.readItemRequest(req, res);
});

advertsRouter.delete('/clips/:guid', (req, res) => {
  req.filePath = advertsPath;
  clipsController.deleteItemRequest(req, res);
})

module.exports = advertsRouter
