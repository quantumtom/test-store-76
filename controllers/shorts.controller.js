const fs = require("fs");
const filePath = './data/shorts.json'

exports.createOneRequest = (req, res) => {
  res.status(201).json({message: "New resource created!"});
}

exports.readOneRequest = (req, res) => {
  const itemID = req.params.id;

  fs.readFile(filePath, 'utf8',
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      let payload = JSON.parse(data);

      res.status(200).send(payload[itemID]);
    });
}

exports.updateOneRequest = (req, res) => {
  res.status(201).json({message: "Resource updated!"});
}

exports.deleteOneRequest = (req, res) => {
  res.status(202).json({message: "Resource deleted!"});
}

exports.readAllRequest = (req, res) => {
  fs.readFile(filePath, 'utf8',
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const payload = JSON.parse(data);

      res.status(200).send(payload);
    });
};
