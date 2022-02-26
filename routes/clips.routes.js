const express = require('express')
const clipsRoutes = express.Router()
const path = require('path')
const advertsPath = path.resolve(__dirname, '../data/adverts.json');
const shortsPath = path.resolve(__dirname, '../data/shorts.json');
const clipsController = require('../controllers/clips.controller');

clipsRoutes.get('/adverts', (req, res) => {
  req.filePath = advertsPath;
  clipsController.readListRequest(req, res);
});

clipsRoutes.post('/adverts', (req, res) => {
  req.filePath = advertsPath;
  clipsController.createListRequest(req, res);
});

clipsRoutes.post('/adverts/clips', (req, res) => {
  req.filePath = advertsPath;
  clipsController.addItemRequest(req, res);
});

clipsRoutes.post('/adverts/clips/:guid', (req, res) => {
  req.filePath = advertsPath;
  clipsController.addItemRequest(req, res);
});

clipsRoutes.put('/adverts/clips', (req, res) => {
  req.filePath = advertsPath;
  clipsController.addItemRequest(req, res);
});

clipsRoutes.put('/adverts/clips/:guid', (req, res) => {
  req.filePath = advertsPath;
  clipsController.replaceItemRequest(req, res);
});

clipsRoutes.get('/adverts/clips/:guid', (req, res) => {
  req.filePath = advertsPath;
  clipsController.readItemRequest(req, res);
});

clipsRoutes.delete('/adverts/clips/:guid', (req, res) => {
  req.filePath = advertsPath;
  clipsController.deleteItemRequest(req, res);
})

clipsRoutes.get('/shorts', (req, res) => {
  req.filePath = shortsPath;
  clipsController.readListRequest(req, res);
});

clipsRoutes.post('/shorts', (req, res) => {
  req.filePath = shortsPath;
  clipsController.createListRequest(req, res);
});

clipsRoutes.post('/shorts/clips', (req, res) => {
  req.filePath = shortsPath;
  clipsController.addItemRequest(req, res);
});

clipsRoutes.post('/shorts/clips/:guid', (req, res) => {
  req.filePath = shortsPath;
  clipsController.addItemRequest(req, res);
});

clipsRoutes.put('/shorts/clips', (req, res) => {
  req.filePath = shortsPath;
  clipsController.addItemRequest(req, res);
});

clipsRoutes.put('/shorts/clips/:guid', (req, res) => {
  req.filePath = shortsPath;
  clipsController.replaceItemRequest(req, res);
});

clipsRoutes.get('/shorts/clips/:guid', (req, res) => {
  req.filePath = shortsPath;
  clipsController.readItemRequest(req, res);
});

clipsRoutes.delete('/shorts/clips/:guid', (req, res) => {
  req.filePath = shortsPath;
  clipsController.deleteItemRequest(req, res);
})


module.exports = clipsRoutes
