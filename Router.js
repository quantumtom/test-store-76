const express = require('express')
const app = express()
const cors = require('cors')

const advertsRoutes = require('./routes/adverts.routes')
const shortsRoutes = require('./routes/shorts.routes')

app.use(cors())
app.options('*', cors())

app.use(express.json( {
  type: 'application/json',
  strict: true
} ))

app.use('/v2/adverts/', advertsRoutes)
app.use('/v2/shorts/', shortsRoutes)

app.disable('x-powered-by')

module.exports = app;
