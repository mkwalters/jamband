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

const uploadFile = (fileName, previousPath, songName) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);
  const s3key = uuidv4();
  const s3DatabaseKey = "https://jamband.s3.us-west-1.amazonaws.com/" + s3key;
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

    let path = previousPath;
    if (path !== "root") {
      path += ".";
      path += "remix";
    }

    console.log(path, songName);

    database.query(
      "INSERT INTO songs (s3Key, path, name) VALUES ($1, $2, $3)",
      [s3DatabaseKey, path, songName]
    );
  });
};

router.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  console.log(req.body);
  const file = req.files.file;
  const path = req.body.previousPath;
  const songName = req.body.songName;

  console.log(req.body);

  file.mv(`${__dirname}/../uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    uploadFile(`${__dirname}/../uploads/${file.name}`, path, songName);
    res.json({ fileName: file.name, filePath: `/../uploads/${file.name}` });
  });
});

module.exports = router;
