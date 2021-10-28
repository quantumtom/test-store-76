const express = require('express')
const app = express()
const cors = require('cors')

const vOneAdvertsRoutes = require('./routes/vOneAdvertsRoutes')
const vOneShortsRoutes = require('./routes/vOneShortsRoutes')
const advertsRoutes = require('./routes/adverts.routes')
const shortsRoutes = require('./routes/shorts.routes')

app.use(express.json())
app.use(express.urlencoded(
  {
    extended: true
  }))

app.use(cors())
app.options('*', cors())

app.use('/v1/adverts/', vOneAdvertsRoutes)
app.use('/v1/shorts/', vOneShortsRoutes)
app.use('/v2/adverts/', advertsRoutes)
app.use('/v2/shorts/', shortsRoutes)

app.disable('x-powered-by')

module.exports = app;
