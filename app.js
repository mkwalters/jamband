var express = require("express");
var passport = require("passport");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var authRouter = require("./routes/auth");
var usersRouter = require("./routes/users");
var awsRouter = require("./routes/aws");
var songsRouter = require("./routes/songs");
var votesRouter = require("./routes/votes");
const fileUpload = require("express-fileupload");

var app = express();
require("./boot/auth")();

app.use(logger("dev"));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/client/build")));
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(function (req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  req.session.messages = [];
  next();
});
app.use(passport.initialize());
app.use(passport.authenticate("session"));

// Define routes.
app.use("/", authRouter);

app.use("/getUser", function (req, res, next) {
  res.json(req.user);
});

app.use("/aws", awsRouter);
app.use("/songs", songsRouter);
app.use("/votes", votesRouter);
app.use("/users", usersRouter);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

module.exports = app;
