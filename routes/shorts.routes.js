const express = require('express')
const path = require("path")
const shortRouter = express.Router()
const clipsController = require("../controllers/clips.controller")
const shortsPath = path.resolve(__dirname, "../data/shorts.json");

shortRouter.get('/', (req, res) => {
  req.filePath = shortsPath;
  clipsController.readListRequest(req, res);
});

shortRouter.post('/', (req, res) => {
  req.filePath = shortsPath;
  clipsController.createListRequest(req, res);
});

shortRouter.post('/clips', (req, res) => {
  req.filePath = shortsPath;
  clipsController.addItemRequest(req, res);
});

shortRouter.put('/clips', (req, res) => {
  req.filePath = shortsPath;
  clipsController.addItemRequest(req, res);
});

shortRouter.put('/clips/:guid', (req, res) => {
  req.filePath = shortsPath;
  clipsController.replaceItemRequest(req, res);
});

shortRouter.get('/clips/:guid', (req, res) => {
  req.filePath = shortsPath;
  clipsController.readItemRequest(req, res);
});

shortRouter.delete('/clips/:guid', (req, res) => {
  req.filePath = shortsPath;
  clipsController.deleteItemRequest(req, res);
})

module.exports = shortRouter
