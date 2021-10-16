const fs = require("fs");
const filePath = "./work.json"

// Receive JSON POST request and save it to a file
exports.createOneRequest = (req, res) => {
  const payload = req.json;

  try {
    res.set('Content-Type', 'application/json')
    res.status(200).send(payload);
    // fs.writeFileSync(filePath, payload);
  } catch (err) {
    console.error(err);
  }
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
