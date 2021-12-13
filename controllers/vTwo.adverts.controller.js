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

// PUT /v2/adverts/clip/:guid (item)
  exports.replaceItemRequest = (req, res) => {
    const itemID = req.params.guid;
    let payload = req.body;
    let statusCode = 204;

    if (!itemID) {
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

      const itemIndex = dataFile.clips.findIndex((item) => {
        return item.guid === itemID;
      });

      // TODO: Add deep (recursive) copying of the object
      //  so as not to overwrite any unassigned property data.

      payload["guid"]  = itemID;

      // Item locator found nothing.
      if (itemIndex < 0) {
        payload["guid"]  = itemID;
        //  Add item as a new entry.
        dataFile.clips.push(payload);
        statusCode = 201;
      // Item locator found an entry.
      } else {
        //  Modify the entry.
        dataFile.clips[itemIndex] = payload;
        statusCode = 200;
      }

      dataFile = JSON.stringify(dataFile);

      fs.writeFile(filePath, dataFile, fsOpts,
        (err, data) => {
          if (err) {
            console.error(err, data)
            return;
          }

          res.status(statusCode).send(dataFile);
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
