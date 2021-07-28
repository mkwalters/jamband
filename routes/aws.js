var express = require("express");
var AWS = require("aws-sdk");
var router = express.Router();
const fs = require("fs");

require("dotenv").config();

const ID = process.env.ID;
const SECRET = process.env.SECRET;
const BUCKET_NAME = process.env.BUCKET_NAME;

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

const uploadFile = (fileName, storageFilename) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: storageFilename, // File name you want to save as in S3
    Body: fileContent,
  };

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

router.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const file = req.files.file;
  file.mv(`${__dirname}/../uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    uploadFile(`${__dirname}/../uploads/${file.name}`, file.name);
    res.json({ fileName: file.name, filePath: `/../uploads/${file.name}` });
  });
});

module.exports = router;
