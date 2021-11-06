const fs = require("fs");
const path = require("path")
const filePath = path.resolve(__dirname, "../vTwo.adverts.json");

// GET (collection)
exports.readListRequest = (req, res) => {
  fs.readFile(filePath, 'utf8',
    (err, fileData) => {
      if (err) {
        console.error(err);
        return;
      }

      res.status(302).json(fileData);
    });
};

exports.createListRequest = (req, res) => {
  res.status(201).json({message: "New resource created!"});
}

// GET (single item)
exports.readItemRequest = (req, res) => {
  const itemID = req.params.id;

  fs.readFile(filePath, 'utf8',
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      let payload = JSON.parse(data);

      res.status(302).send(payload[itemID]);
    });
}

// PUT /v2/adverts/:id
exports.replaceItemRequest = (req, res) => {
  const itemID = req.params.id;
  const payload = req;

  fs.readFile(filePath, 'utf8',
  (err, oldDataFile) => {
    if (err) {
      res.status(404).send("File not found: " + itemID);
      console.error(err);
      return;
    }

    oldDataFile[itemID.toString()] = payload;

    fs.writeFile(filePath, oldDataFile, 'utf8',
      (err, data) => {
        if (err) {
          console.error(err, data)
          return;
        }

        res.status(200).json(req.body);
      });
  });
}

// PATCH
exports.updateItemRequest = (req, res) => {
  const itemID = req.params.id;

  res.status(201).send("Updated resource: " + itemID);
}

// DELETE
exports.deleteItemRequest = (req, res) => {
  const itemID = req.params.id;

  res.status(201).send("Deleted resource: " + itemID);
}
