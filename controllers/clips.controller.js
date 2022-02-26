const { v4 } = require('uuid');
const fs = require('fs');
const fsOpts = {encoding: 'utf8'};

// GET /v2/adverts (collection)
exports.readListRequest = function(req, res) {
  fs.readFile(req.filePath, fsOpts,
    (err, dataFile) => {
      if (err) {
        console.error(err);
        return;
      }

      res.status(200).send(JSON.parse(dataFile));
    });
}

// GET /v2/adverts/clips/:guid (item)
exports.readItemRequest = (req, res) => {
  const itemID = req.params.guid;
  const filePath = req.filePath;

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
  const filePath = req.filePath;

  fs.writeFile(filePath, payload, (err, data) => {
    if (err) console.error(err, data)

    res.status(201).json(req.body);
  });
}

// POST and PUT /v2/adverts/clips (item, without record locator)
exports.addItemRequest = (req, res) => {
  let payload = req.body;
  let guid = req.params.guid;
  const position = payload.itemIndex || 0;
  const filePath = req.filePath;

  fs.readFile(filePath, fsOpts,
    (err, dataFile) => {
      if (err) {
        console.error(err);
        return;
      }

      dataFile = JSON.parse(dataFile);

      if (!guid) {
        guid = v4();
      }

      dataFile.clips.splice(position, 0, payload);

      dataFile = JSON.stringify(dataFile);

      fs.writeFile(filePath, dataFile, (err, data) => {
        if (err) console.error(err, data)

        res.location('/v2/adverts/clips/' + payload.guid)
        res.status(201).json(payload);
      });
    });
}

// PUT /v2/adverts/clips/:guid (item, with record locator)
exports.replaceItemRequest = (req, res) => {
  const filePath = req.filePath;
  const itemID = req.params.guid;
  let payload = req.body;
  let statusCode = 204;

  if (!itemID) {
    statusCode = 400;
    res.status(statusCode).send('No record id.');
    return;
  }

  if (!payload) {
    res.status(204).send('No content.');
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

      // TODO: Implement deep copy of the object
      //  so as not to overwrite any extant object values.

      // Item locator found nothing.
      if (itemIndex < 0) {
        //  Add item as a new entry.
        payload.guid  = itemID;
        dataFile.clips.push(payload);
        statusCode = 201;
      } else {
        // Item locator found an entry.
        //  Modify the entry.
        payload.guid = v4();
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
  const filePath = req.filePath;
  const clipID = req.params.guid;

  fs.readFile(filePath, fsOpts,
    (err, dataFile) => {
      if (err) {
        console.error(err);
        return;
      }

      dataFile = JSON.parse(dataFile);

      const clipIndex = dataFile.clips.findIndex((item) => {
        return item.guid === clipID;
      });

      if (clipIndex < 0) {
        res.status(404).send('itemID ' + clipID + ' not found.');
        return;
      }

      dataFile.clips.splice(clipIndex, 1);

      fs.writeFile(filePath, JSON.stringify(dataFile), fsOpts,
        (err, data) => {
          if (err) {
            console.error(err, data)
          }
          res.status(200).send(`Deleted clipID '${clipID}'!`);
        });
    })
}
