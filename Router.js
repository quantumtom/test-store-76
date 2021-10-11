const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const SERVER_PORT = process.env.SERVER_PORT || '8080';
const cors = require('cors');

const vOneShortsRouter = require('./routes/vOneShortsRoutes')
const vOneAdvertsRouter = require('./routes/vOneAdvertsRoutes')
const shortsRouter = require('./routes/shorts.routes')
const advertsRouter = require('./routes/adverts.routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded(
  {
    extended: true
  }))

app.use(cors())
app.disable('x-powered-by')

app.use('/v1/shorts/', vOneShortsRouter)
app.use('/v1/work/', vOneAdvertsRouter)
app.use('/v2/shorts/', shortsRouter)
app.use('/v2/adverts/', advertsRouter)

app.listen(SERVER_PORT,
  () => console.log(`the router is alive on port:${SERVER_PORT}`)
)
