var express = require("express");
var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
var database = require("../database");

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  database.query(
    "SELECT * FROM songs, users WHERE author = user_id",
    [],
    function (err, result) {
      if (err) {
        return next(err);
      }

      // TODO: Handle undefined row.

      console.log(result.rows);
      res.json({ data: result.rows });
    }
  );
});
//"*." + req.params.node + ".*"
router.get("/getTree/:furthestAncestor", function (req, res, next) {
  console.log("getting tree");
  console.log(req.params.furthestAncestor);
  console.log(
    `SELECT path FROM songs WHERE path ~ '${
      "*." + req.params.furthestAncestor + ".*"
    }'`
  );
  database.query(
    `SELECT * FROM songs WHERE path ~ '${
      "*." + req.params.furthestAncestor + ".*"
    }'`,
    [],
    function (err, result) {
      if (err) {
        return next(err);
      }

      // TODO: Handle undefined row.

      console.log(result.rows);
      res.json({ data: result.rows });
    }
  );
});

router.get("/:id", function (req, res) {
  database.query(
    "SELECT * FROM songs WHERE song_id = $1",
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
