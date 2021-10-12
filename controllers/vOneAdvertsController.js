const fs = require("fs");
const filePath = './work.json'

exports.createOneRequest = (req, res) => {
  const payload = JSON.stringify(req.body);
  res.status(200).send('v1 work write endpoint functional.');
  fs.writeFileSync('work.json', payload);
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
