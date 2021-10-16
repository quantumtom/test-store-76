const fs = require("fs");
const filePath = "./shorts.json"

// Receive JSON POST request and save it to a file
exports.createOneRequest = (req, res) => {
  const payload = JSON.stringify(req.body);
  res.status(200).send("File inbound");
  fs.writeFileSync(filePath, payload);
}

// Receive query GET request and respond with JSON data
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
