var express = require("express");
var passport = require("passport");

var router = express.Router();

router.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  })
);

router.get("/logout", function (req, res, next) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
