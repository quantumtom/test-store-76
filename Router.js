const express = require('express')
const app = express()
const cors = require('cors')

const clipsRoutes = require('./routes/clips.routes')

app.use(cors())
app.options('*', cors())

app.use(express.json( {
  type: 'application/json',
  strict: true
} ))

app.use('/v2', clipsRoutes)

app.disable('x-powered-by')

module.exports = app;
