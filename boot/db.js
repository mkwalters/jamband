var db = require("../db");

module.exports = function () {
  db.serialize(function () {
    db.run(
      "CREATE TABLE IF NOT EXISTS users ( \
      username TEXT UNIQUE, \
      hashed_password BLOB, \
      salt BLOB, \
      name TEXT \
    )"
    );

    db.run(
      "CREATE TABLE IF NOT EXISTS songs ( \
      s3ID TEXT UNIQUE, \
      userID INT \
    )"
    );
  });

  //db.close();
};
