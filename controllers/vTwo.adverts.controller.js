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

// GET /v2/adverts/:index (item)
exports.readItemRequest = (req, res) => {
  const itemIndex = req.params.index;

  fs.readFile(filePath, fsOpts,
    (err, dataFile) => {
      if (err) {
        console.error(err);
        return;
      }

      dataFile = JSON.parse(dataFile);

      if (!dataFile.clips[itemIndex]) {
        res.status(404)
      } else {
        res.status(200).json(dataFile.clips[itemIndex]);
      }
    });
}

// POST /v2/adverts (collection)
exports.createListRequest = (req, res) => {
  const payload = JSON.stringify(req.body);

  fs.writeFile(filePath, payload, (err, data) => {
    if (err) console.error(err, data)

    res.status(201).json(req.body);
  });
}

// POST /v2/adverts/clips (item)
exports.addItemRequest = (req, res) => {
  fs.readFile(filePath, fsOpts,
    (err, dataFile) => {
      if (err) {
        console.error(err);
        return;
      }

      dataFile = JSON.parse(dataFile);

      dataFile.clips.push(req.body)

      dataFile = JSON.stringify(dataFile);

      fs.writeFile(filePath, dataFile, (err, data) => {
        if (err) console.error(err, data)

        res.status(201).send(dataFile);
      });
    });
}

// PUT /v2/adverts/clip/:id (item)
  exports.replaceItemRequest = (req, res) => {
    const itemIndex = req.params.index;
    const payload = req.body;
    let statusCode = 204;

    if (!itemIndex) {
      statusCode = 400;
      res.status(statusCode).send("No record id.");
      return;
    }

    if (!payload) {
      res.status(204).send("No content.");
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
        // Item already exists
        statusCode = 200;
      } else {
        // Item was created
        statusCode = 201;
      }

      try {
        dataFile.clips[itemID] = payload;
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

// DELETE /v2/adverts/clips/:guid (item)
exports.deleteItemRequest = (req, res) => {

  const itemID = req.params.guid;
  let statusCode = 405;

  fs.readFile(filePath, fsOpts,
    (err, dataFile) => {
      if (err) {
        console.error(err);
        return;
      }

      dataFile = JSON.parse(dataFile);

      const itemIndex = dataFile.clips.findIndex((item) => {
        return item.guid === itemID;
      });

      console.log(`itemIndex is '${itemIndex}'.`);
      console.dir(itemIndex);

      if (!itemIndex) {
        console.log('itemID ' + itemID + ' not found.');
        res.status(404).send('itemID ' + itemID + ' not found.');
      } else {
        console.log(`removing '${itemID}' from dataFile`);
        statusCode = 202;
        dataFile.clips.splice(itemIndex, 1);
        saveChanges(dataFile);
        res.status(202).send(`Deleted itemID '${itemID}'!`);
      }
    });
}

function saveChanges (dataFile) {
  fs.writeFile(filePath, JSON.stringify(dataFile), fsOpts,
    (err, data) => {
      if (err) {
        console.error(err, data)
      }
    });
}
