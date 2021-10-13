const fs = require("fs");
const filePath = './work.json'

exports.createOneRequest = (req, res) => {
  const payload = JSON.stringify(req.body);

  res.format({
    'text/plain': function () {
      res.send('hey')
    },

    'text/html': function () {
      res.send('<p>hey</p>')
    },

    'application/json': function () {
      res.send({ message: 'hey' })
    },

    default: function () {
      // log the request and respond with 406
      res.status(406).send('Not Acceptable')
    }
  });

  res.status(200).send({'messages':'v1 work write endpoint functional.'});
  // fs.writeFileSync('work.json', payload);
}

exports.readAllRequest = (req, res) => {
  fs.readFile(filePath, 'utf8',
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      const payload = JSON.parse(data);

      res.status(302).send(payload);
    });
};
