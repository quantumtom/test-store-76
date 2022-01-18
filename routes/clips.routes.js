const express = require('express')
const clipsRoutes = express.Router()
const path = require('path')
const clipsPath = path.resolve(__dirname, '../data/adverts.json');
const clipsController = require('../controllers/clips.controller')

clipsRoutes.get('/', (req, res) => {
  req.filePath = clipsPath;
  clipsController.readListRequest(req, res);
});

clipsRoutes.post('/', (req, res) => {
  req.filePath = clipsPath;
  clipsController.createListRequest(req, res);
});

clipsRoutes.post('/clips', (req, res) => {
  req.filePath = clipsPath;
  clipsController.addItemRequest(req, res);
});

clipsRoutes.put('/clips', (req, res) => {
  req.filePath = clipsPath;
  clipsController.addItemRequest(req, res);
});

clipsRoutes.put('/clips/:guid', (req, res) => {
  req.filePath = clipsPath;
  clipsController.replaceItemRequest(req, res);
});

clipsRoutes.get('/clips/:guid', (req, res) => {
  req.filePath = clipsPath;
  clipsController.readItemRequest(req, res);
});

clipsRoutes.delete('/clips/:guid', (req, res) => {
  req.filePath = clipsPath;
  clipsController.deleteItemRequest(req, res);
})

module.exports = clipsRoutes
