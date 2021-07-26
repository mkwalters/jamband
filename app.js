var express = require("express");
var passport = require("passport");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var myaccountRouter = require("./routes/myaccount");
var usersRouter = require("./routes/users");
var uploadRouter = require("./routes/upload");
var testRouter = require("./routes/test");
const fileUpload = require("express-fileupload");

var app = express();
require("./boot/db")();
require("./boot/auth")();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.

app.use(logger("dev"));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));
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

// app.post("/upload", (req, res) => {
//   if (req.files === null) {
//     return res.status(400).json({ msg: "No file uploaded" });
//   }

//   console.log(req.files);
//   const file = req.files.file;

//   file.mv(`${__dirname}/uploads/${file.name}`, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }

//     res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
//   });
// });

app.use("/upload", uploadRouter);

app.use("/api/getList", testRouter);

app.use("/myaccount", myaccountRouter);
app.use("/users", usersRouter);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build"));
});

module.exports = app;
