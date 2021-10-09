const fs = require("fs");
const filePath = './shorts.json'

exports.createOneRequest = (req, res) => {
  const payload = JSON.stringify(req.body);
  res.status(200).send(`POST #1 works. 'req.body' is '${payload}.'`);
  fs.writeFileSync('shorts.json', payload);
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
