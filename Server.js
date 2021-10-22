const Router = require('./Router');
const SERVER_PORT = process.env.SERVER_PORT || '8080';

exports.start = () => {
  Router.listen(SERVER_PORT,
    () => console.log(`the router is alive on port:${SERVER_PORT}`)
  )
}

