const fs = require("fs");
const filePath = "./shorts.json"

// Receive query GET request and respond with JSON data
exports.readAllRequest = (req, res) => {
  fs.readFile(filePath, {encoding: "utf8"},
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      res.status(302).json(data);
    });
};

// Receive JSON POST request and save it to a file
exports.createOneRequest = (req, res) => {
  const payload = JSON.stringify(req.body);

  res.status(200).json(payload);

  fs.writeFileSync(filePath, payload.data);
}
