const fs = require("fs");
const path = require("path")
const filePath = path.resolve(__dirname, "../vTwo.adverts.json");

// GET (collection)
exports.readListRequest = (req, res) => {
  fs.readFile(filePath, {encoding: "utf8"},
    (err, fileData) => {
      if (err) {
        console.error(err);
        return;
      }

      res.status(302).send(JSON.parse(fileData));
    });
};

exports.createListRequest = (req, res) => {
  res.status(201).json({message: "New resource created!"});
}

// GET (single item)
exports.readItemRequest = (req, res) => {
  const itemID = req.params.id;

  fs.readFile(filePath, {encoding: "utf8"},
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
  const payload = req.body;
  let statusCode = 204;

  if (!itemID) {
    res.status(statusCode).send("No record id.");
    return;
  }

  if (!payload) {
    res.status(statusCode).send("No content.");
    return;
  }

  fs.readFile(filePath, {encoding: "utf8"},
  (err, oldDataFile) => {
    if (err) {
      console.error(err);
      return;
    }

    oldDataFile = JSON.parse(oldDataFile);

    if (!!oldDataFile[itemID]) {
      statusCode = 200;
    } else {
      statusCode = 201;
    }

    try {
      oldDataFile[itemID] = payload;
    } catch (err) {
      console.error(err);
    }

    oldDataFile = JSON.stringify(oldDataFile);

    fs.writeFile(filePath, oldDataFile, {encoding: "utf8"},
      (err, data) => {
        if (err) {
          console.error(err, data)
          return;
        }

        res.status(statusCode).json(JSON.parse(oldDataFile));
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
  const payload = req.body;
  let statusCode = 405;

  if (!itemID) {
    res.status(statusCode).send("No record id.");
    return;
  }

  fs.readFile(filePath, {encoding: "utf8"},
    (err, oldDataFile) => {
      if (err) {
        console.error(err);
        return;
      }

      oldDataFile = JSON.parse(oldDataFile);

      if (!!oldDataFile[itemID]) {
        statusCode = 200;
      } else {
        statusCode = 404;
      }

      try {
        delete oldDataFile[itemID];
      } catch (err) {
        console.error(err);
      }

      oldDataFile = JSON.stringify(oldDataFile);

      fs.writeFile(filePath, oldDataFile, {encoding: "utf8"},
        (err, data) => {
          if (err) {
            console.error(err, data)
            return;
          }

          res.status(statusCode).json(JSON.parse(oldDataFile));
        });
    });
}
