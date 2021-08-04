var express = require("express");
var crypto = require("crypto");

var database = require("../database");

var router = express.Router();

router.get("/new", function (req, res, next) {
  res.render("signup");
});

router.post("/", function (req, res, next) {
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    10000,
    32,
    "sha256",
    function (err, hashedPassword) {
      if (err) {
        return next(err);
      }

      database
        .query(
          "INSERT INTO users (username, hashed_password, salt) VALUES ($1, $2, $3) RETURNING user_id",
          [req.body.username, hashedPassword, salt]
        )
        .then((result) => {
          if (err) {
            return next(err);
          }

          console.log(result.rows);
          var user = {
            user_id: result.rows[0].user_id,
            username: req.body.username,
          };
          console.log(user);
          req.login(user, function (err) {
            if (err) {
              return next(err);
            }
            res.redirect("/");
          });
        });
    }
  );
});

module.exports = router;
