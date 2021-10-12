const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');

const vOneAdvertsRouter = require('./routes/vOneAdvertsRoutes')
const vOneShortsRouter = require('./routes/vOneShortsRoutes')
const advertsRouter = require('./routes/adverts.routes')
const shortsRouter = require('./routes/shorts.routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded(
  {
    extended: true
  }))

app.use(cors())
app.disable('x-powered-by')

app.use('/v1/work/', vOneAdvertsRouter)
app.use('/v1/shorts/', vOneShortsRouter)
app.use('/v2/adverts/', advertsRouter)
app.use('/v2/shorts/', shortsRouter)

module.exports = app;
