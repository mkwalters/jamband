var express = require("express");
var AWS = require("aws-sdk");
var router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
var database = require("../database");

require("dotenv").config();

const ID = process.env.ID;
const SECRET = process.env.SECRET;
const BUCKET_NAME = process.env.BUCKET_NAME;

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

const uploadFile = (fileName, path) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);
  const s3key = uuidv4();
  const s3DatabaseKey =
    "https://jamband.s3.us-west-1.amazonaws.com/" + s3key + ".mp3";
  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: s3key, // File name you want to save as in S3
    Body: fileContent,
  };

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);

    database.query("INSERT INTO songs (s3Key, path) VALUES ($1, $2)", [
      s3DatabaseKey,
      path,
    ]);
    // db.run("INSERT INTO songs (s3ID) VALUES (" + s3key + ")");
  });
};

router.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const file = req.files.file;
  const path = req.body.path;

  console.log(req.body);

  file.mv(`${__dirname}/../uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    uploadFile(`${__dirname}/../uploads/${file.name}`, path);
    res.json({ fileName: file.name, filePath: `/../uploads/${file.name}` });
  });
});

module.exports = router;
