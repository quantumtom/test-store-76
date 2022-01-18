const express = require('express')
const shortsRoutes = express.Router()
const path = require('path')
const shortsPath = path.resolve(__dirname, '../data/shorts.json');
const clipsController = require('../controllers/clips.controller')

shortsRoutes.get('/', (req, res) => {
  req.filePath = shortsPath;
  clipsController.readListRequest(req, res);
});

shortsRoutes.post('/', (req, res) => {
  req.filePath = shortsPath;
  clipsController.createListRequest(req, res);
});

shortsRoutes.post('/clips', (req, res) => {
  req.filePath = shortsPath;
  clipsController.addItemRequest(req, res);
});

shortsRoutes.put('/clips', (req, res) => {
  req.filePath = shortsPath;
  clipsController.addItemRequest(req, res);
});

shortsRoutes.put('/clips/:guid', (req, res) => {
  req.filePath = shortsPath;
  clipsController.replaceItemRequest(req, res);
});

shortsRoutes.get('/clips/:guid', (req, res) => {
  req.filePath = shortsPath;
  clipsController.readItemRequest(req, res);
});

shortsRoutes.delete('/clips/:guid', (req, res) => {
  req.filePath = shortsPath;
  clipsController.deleteItemRequest(req, res);
})

module.exports = shortsRoutes
