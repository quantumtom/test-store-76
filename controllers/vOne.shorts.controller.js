const fs = require("fs");
const path = require("path");
const fileName = "vOne.shorts.json"
const filePath = path.resolve(__dirname, "../" + fileName);

// Receive query GET request and respond with JSON data
exports.readAllRequest = (req, res) => {
  fs.readFile(filePath, {encoding: "utf8"},
    (err, fileData) => {
      if (err) {
        console.error(err);
        return;
      }

      res.status(200).json(fileData);
    });
};

// Receive JSON POST request and save it to a file
exports.createOneRequest = (req, res) => {
  const payload = JSON.stringify(req.body);

  fs.writeFile(fileName, payload, (err, data) => {
    if (err) console.error(err, data)

    res.status(200).json(payload);
  });
}
