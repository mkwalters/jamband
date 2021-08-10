var express = require("express");
var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
var database = require("../database");

var router = express.Router();

router.put("/", function (req, res, next) {
  console.log();
  console.log(req.body);

  database
    .query(`select * from votes WHERE song_id = $2 and user_id = $1`, [
      req.body.userId,
      req.body.songId,
    ])
    .then((result) => {
      if (result.rows.length > 0) {
        if (req.body.liked === result.rows[0].liked) {
          // change value to null
          database
            .query(
              `UPDATE votes SET liked = NULL WHERE user_id = $1 and song_id = $2`,
              [req.body.userId, req.body.songId]
            )
            .then((result) => {
              return res.send({
                songId: req.body.songId,
                userId: req.body.userId,
                liked: null,
              });
            });
        } else {
          //just update value
          database
            .query(
              `UPDATE votes SET liked = $3 WHERE user_id = $1 and song_id = $2`,
              [req.body.userId, req.body.songId, req.body.liked]
            )
            .then((result) => {
              return res.send({
                songId: req.body.songId,
                userId: req.body.userId,
                liked: req.body.liked,
              });
            });
        }
      } else {
        //insert value
        database
          .query(
            `INSERT INTO votes (user_id, song_id, liked) VALUES ($1, $2, $3)`,
            [req.body.userId, req.body.songId, req.body.liked]
          )
          .then((result) => {
            return res.send({
              songId: req.body.songId,
              userId: req.body.userId,
              liked: req.body.liked,
            });
          });
      }
    });
});
//"*." + req.params.node + ".*"

module.exports = router;
