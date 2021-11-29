const fs = require("fs");
const path = require("path")
const filePath = path.resolve(__dirname, "../vTwo.adverts.json");
const fsOpts = {encoding: "utf8"};

// GET /v2/adverts (collection)
exports.readListRequest = (req, res) => {
  fs.readFile(filePath, fsOpts,
    (err, dataFile) => {
      if (err) {
        console.error(err);
        return;
      }

      res.status(200).send(JSON.parse(dataFile));
    });
};

// POST /v2/adverts (collection)
exports.createListRequest = (req, res) => {
  const payload = JSON.stringify(req.body);

  fs.writeFile(filePath, payload, (err, data) => {
    if (err) console.error(err, data)

    res.status(201).json(req.body);
  });
}

// GET /v2/adverts/:id (item)
exports.readItemRequest = (req, res) => {
  const itemID = req.params.id;

  fs.readFile(filePath, fsOpts,
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

// PUT /v2/adverts/:id (item)
exports.replaceItemRequest = (req, res) => {
  const itemID = req.params.id;
  const payload = req.body;
  let statusCode = 204;

  if (!itemID) {
    res.status(400).send("No record id.");
    return;
  }

  if (!payload) {
    res.status(400).send("No content.");
    return;
  }

  fs.readFile(filePath, fsOpts,
  (err, dataFile) => {
    if (err) {
      console.error(err);
      return;
    }

    dataFile = JSON.parse(dataFile);

    if (!!dataFile.clips[itemID]) {
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

    fs.writeFile(filePath, dataFile, fsOpts,
      (err, data) => {
        if (err) {
          console.error(err, data)
          return;
        }

        res.status(statusCode).json(dataFile);
      });
  });
}

// PATCH /v2/adverts/:id (item)
exports.updateItemRequest = (req, res) => {
  const itemID = req.params.id;

  res.status(201).send("Updated resource: " + itemID);
}

// DELETE (item)
exports.deleteItemRequest = (req, res) => {

  const itemID = req.params.id;
  let statusCode = 405;

  if (!itemID) {
    res.status(statusCode).send("No record id.");
    return;
  }

  fs.readFile(filePath, fsOpts,
    (err, dataFile) => {
      if (err) {
        console.error(err);
        return;
      }

      dataFile = JSON.parse(dataFile);

      if (!!dataFile[itemID]) {
        statusCode = 200;
        console.log(`removing ${itemID} from dataFile`);
        delete dataFile[itemID];
      } else {
        statusCode = 404;
        console.log('itemID ' + itemID + ' not found.');
      }

      dataFile = JSON.stringify(dataFile);

      fs.writeFile(filePath, dataFile, fsOpts,
        (err, data) => {
          if (err) {
            console.error(err, data)
            return;
          }

          res.status(statusCode).json(dataFile);
        });
    });
}
