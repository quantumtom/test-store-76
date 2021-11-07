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
  const payload = JSON.stringify(req.body);

  fs.writeFile(filePath, payload, (err, data) => {
    if (err) console.error(err, data)

    res.status(201).json({message: "New resource created!"});
  });
}

// GET (single item)
exports.readItemRequest = (req, res) => {
  const itemID = req.params.id;

  fs.readFile(filePath, {encoding: "utf8"},
    (err, dataFile) => {
      if (err) {
        console.error(err);
        return;
      }

      dataFile = JSON.parse(dataFile);

      if (!dataFile[itemID]) {
        res.status(404)
      } else {
        res.status(200).json(dataFile[itemID]);
      }
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
  (err, dataFile) => {
    if (err) {
      console.error(err);
      return;
    }

    dataFile = JSON.parse(dataFile);

    if (!!dataFile[itemID]) {
      statusCode = 200;
    } else {
      statusCode = 201;
    }

    try {
      dataFile[itemID] = payload;
    } catch (err) {
      console.error(err);
    }

    dataFile = JSON.stringify(dataFile);

    fs.writeFile(filePath, dataFile, {encoding: "utf8"},
      (err, data) => {
        if (err) {
          console.error(err, data)
          return;
        }

        res.status(statusCode).json(JSON.parse(dataFile));
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
  let statusCode = 405;

  if (!itemID) {
    res.status(statusCode).send("No record id.");
    return;
  }

  fs.readFile(filePath, {encoding: "utf8"},
    (err, dataFile) => {
      if (err) {
        console.error(err);
        return;
      }

      dataFile = JSON.parse(dataFile);

      if (!!dataFile[itemID]) {
        statusCode = 200;
      } else {
        statusCode = 404;
      }

      try {
        delete dataFile[itemID];
      } catch (err) {
        console.error(err);
      }

      dataFile = JSON.stringify(dataFile);

      fs.writeFile(filePath, dataFile, {encoding: "utf8"},
        (err, data) => {
          if (err) {
            console.error(err, data)
            return;
          }

          res.status(statusCode).json(JSON.parse(dataFile));
        });
    });
}
