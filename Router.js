const cors = require('cors')
const session = require('express-session')
const grant = require('grant').express()
const express = require('express')
const app = express()
const clipsRoutes = require('./routes/clips.routes')

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const scopes = ['private', 'create', 'edit', 'delete', 'upload', 'video_files', 'public'];

const config =
  {
    "defaults": {
      "origin": "http://localhost:3000",
      "transport": "session",
      "state": true
    },
    "vimeo": {
      "key": CLIENT_ID,
      "secret": CLIENT_SECRET,
      "scope": scopes,
      "callback": "https://die-aggravator.herokuapp.com/hello"
    }
  };

app.use(session({secret: 'grant', resave: false, saveUninitialized: false}))
app.use(grant(config))

app.use(cors())
app.options('*', cors())

app.use(express.json( {
  type: 'application/json',
  strict: true
}))

app.use('/v2', clipsRoutes)

app.disable('x-powered-by')

module.exports = app;
