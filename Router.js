const express = require('express')
const app = express()
const cors = require('cors')

const vOneAdvertsRouter = require('./routes/vOneAdvertsRoutes')
const vOneShortsRouter = require('./routes/vOneShortsRoutes')
const advertsRouter = require('./routes/adverts.routes')
const shortsRouter = require('./routes/shorts.routes')

app.use(express.json())
app.use(express.urlencoded(
  {
    extended: true
  }))

app.use(cors())
app.options('*', cors())

app.use('/v1/adverts/', vOneAdvertsRouter)
app.use('/v1/shorts/', vOneShortsRouter)
app.use('/v2/adverts/', advertsRouter)
app.use('/v2/shorts/', shortsRouter)

app.disable('x-powered-by')

module.exports = app;
