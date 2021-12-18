const fs = require("fs");
const path = require("path")
const filePath = path.resolve(__dirname, "../vTwo.adverts.json");
const fsOpts = {encoding: "utf8"};
const { v4: uuidv4 } = require("uuid");

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

// GET /v2/adverts/clips/:guid (item)
exports.readItemRequest = (req, res) => {
  const itemID = req.params.guid;

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

      if (itemIndex < 0) {
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

// POST and PUT /v2/adverts/clips (item without record locator)
exports.addItemRequest = (req, res) => {
  let payload = req.body;

  fs.readFile(filePath, fsOpts,
    (err, dataFile) => {
      if (err) {
        console.error(err);
        return;
      }

      payload.guid = uuidv4();

      dataFile = JSON.parse(dataFile);

      dataFile.clips.push(payload)

      dataFile = JSON.stringify(dataFile);

      fs.writeFile(filePath, dataFile, (err, data) => {
        if (err) console.error(err, data)

        res.status(201).json(payload);
      });
    });
}

// PUT /v2/adverts/clips/:guid (item)
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

      // Item locator found nothing.
      if (itemIndex < 0) {
        //  Add item as a new entry.
        payload.guid  = itemID;
        dataFile.clips.push(payload);
        statusCode = 201;
      } else {
        // Item locator found an entry.
        //  Modify the entry.
        payload.guid = uuidv4();
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

      if (itemIndex < 0) {
        // console.log('itemID ' + itemID + ' not found.');
        res.status(404).send('itemID ' + itemID + ' not found.');
      } else {
        // console.log(`removing '${itemID}' from dataFile`);
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
