const fs = require("fs");
const path = require("path")
const filePath = path.resolve(__dirname, "../work.test.json");

// Receive query GET request and respond with JSON data
exports.readAllRequest = (req, res) => {
  fs.readFile(filePath, "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      res.status(302).json(data);
    });
};

exports.readOneRequest = (req, res) => {
  fs.readFile(path.resolve(__dirname, "../work.json"), "utf8",
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
  const payload = req.body;

  res.status(200).json(payload);

  // fs.writeFileSync(filePath, payload);
};

