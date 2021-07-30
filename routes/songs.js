var express = require("express");
var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
var database = require("../database");

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  database.query("SELECT * FROM songs", [], function (err, result) {
    if (err) {
      return next(err);
    }

    // TODO: Handle undefined row.

    console.log(result.rows);
    res.json({ data: result.rows });
  });
});

router.get("/:id", function (req, res) {
  database.query(
    "SELECT * FROM songs WHERE id = $1",
    [req.params.id],
    function (err, result) {
      if (err) {
        return next(err);
      }

      console.log(result.rows);
      res.json({ data: result.rows });
    }
  );
});
module.exports = router;
