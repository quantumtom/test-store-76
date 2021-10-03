const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const SERVER_PORT = process.env.SERVER_PORT || '8080';
const cors = require('cors');
const fs = require('fs');

app.listen(
  SERVER_PORT,
  () => console.log(`it's alive on port:${SERVER_PORT}`)
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.disable('x-powered-by');

// TODO:
// Swtich to using Express router/routes

app.put('/v1/work/edit', (req, res) => {
  console.log('PATCH request to server');
  res.send('PATCH request to server');
});

app.post('/v1/work/:id', (req, res) => {
  const requestBody = JSON.stringify(req.body);
  res.status(200).send(`POST #2 works. 'req.params.id' is '${req.params.id}'.`);
  fs.writeFileSync('work.json', requestBody);
});

app.get('/v1/get/advert/:id', (req, res) => {
  const requestId = req.params.id;

  fs.readFile('adverts.json', 'utf8',
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const adverts = JSON.parse(data);
      const payload = adverts[requestId];

      res.status(200).send(payload);
    });
});

app.get('/v1/shorts/', (req, res) => {
  fs.readFile('shorts.json', 'utf8',
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const payload = JSON.parse(data);

      res.status(200).send(payload);
    });
});

app.get('/v1/work/', (req, res) => {
  fs.readFile('work.json', 'utf8',
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const payload = JSON.parse(data);

      res.status(200).send(payload);
    });
});

app.put('/v1/work/add', (req, res) => {
  const payload = JSON.stringify(req.body);
  res.status(200).send(`PUT #1 works. 'req.body' is '${payload}.'`);
  fs.writeFileSync('work.json', payload);
});

app.post('/v1/work/create', (req, res) => {
  const payload = JSON.stringify(req.body);
  res.status(200).send(`POST #1 works. 'req.body' is '${payload}.'`);
  fs.writeFileSync('work.json', payload);
});

app.get('/v1/work/get/:id', (req, res) => {
  const requestId = req.params.id;
  res.status(200).send(`GET #2 works. 'req.params.id' is '${requestId}.'`);
  res.end();
});

app.post('/v1/shorts/create', (req, res) => {
  const payload = JSON.stringify(req.body);
  res.status(200).send(`POST #1 works. 'req.body' is '${payload}.'`);
  fs.writeFileSync('shorts.json', payload);
});
