const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const SERVER_NAME = process.env.SERVER_NAME | 'http://localhost';
const SERVER_PORT = process.env.SERVER_PORT | '8080';
const cors = require('cors');
const fs = require('fs');

app.listen(
  SERVER_PORT,
  () => console.log(`it's alive on ${SERVER_NAME}:${SERVER_PORT}`)
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.disable('x-powered-by');

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

app.post('/v1/work/create', (req, res) => {
  const payload = JSON.stringify(req.body);
  res.status(200).send(`POST #1 works. 'req.body' is '${payload}.'`);
  fs.writeFileSync('work.json', payload);
});

app.get('/v1/work/:id', (req, res) => {
  res.status(200).send(`GET #2 works. 'param' is '${req.params.id}.'`);
  res.end();
});

app.post('/v1/work/:id', (req, res) => {
  const payload = JSON.stringify(req.body);
  res.status(200).send(`POST #2 works. 'req.body' is '${payload}'.`);
  fs.writeFileSync('work.json', payload);
});
