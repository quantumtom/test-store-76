const Router = require('./Router');
const SERVER_PORT = process.env.PORT || '8080';

exports.start = () => {
  Router.set('port', SERVER_PORT)
  Router.listen(SERVER_PORT,
    () => console.log(`the router is alive on port:${SERVER_PORT}`)
  )
}

