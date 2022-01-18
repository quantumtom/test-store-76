const express = require('express')
const advertsRoutes = express.Router()
const path = require('path')
const advertsPath = path.resolve(__dirname, '../data/adverts.json');
const clipsController = require('../controllers/clips.controller')

advertsRoutes.get('/', (req, res) => {
  req.filePath = advertsPath;
  clipsController.readListRequest(req, res);
});

advertsRoutes.post('/', (req, res) => {
  req.filePath = advertsPath;
  clipsController.createListRequest(req, res);
});

advertsRoutes.post('/clips', (req, res) => {
  req.filePath = advertsPath;
  clipsController.addItemRequest(req, res);
});

advertsRoutes.put('/clips', (req, res) => {
  req.filePath = advertsPath;
  clipsController.addItemRequest(req, res);
});

advertsRoutes.put('/clips/:guid', (req, res) => {
  req.filePath = advertsPath;
  clipsController.replaceItemRequest(req, res);
});

advertsRoutes.get('/clips/:guid', (req, res) => {
  req.filePath = advertsPath;
  clipsController.readItemRequest(req, res);
});

advertsRoutes.delete('/clips/:guid', (req, res) => {
  req.filePath = advertsPath;
  clipsController.deleteItemRequest(req, res);
})

module.exports = advertsRoutes
