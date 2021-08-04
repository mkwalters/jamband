var passport = require("passport");
var Strategy = require("passport-local");
var crypto = require("crypto");

var database = require("../database");

module.exports = function () {
  // Configure the local strategy for use by Passport.
  //
  // The local strategy requires a `verify` function which receives the credentials
  // (`username` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `cb` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  passport.use(
    new Strategy(function (username, password, cb) {
      database.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
        function (err, result) {
          if (err) {
            return cb(err);
          }
          if (!result) {
            return cb(null, false, {
              message: "Incorrect username or password.",
            });
          }
          let userData = result.rows[0];

          crypto.pbkdf2(
            password,
            userData.salt,
            10000,
            32,
            "sha256",
            function (err, hashedPassword) {
              if (err) {
                return cb(err);
              }
              if (
                !crypto.timingSafeEqual(
                  userData.hashed_password,
                  hashedPassword
                )
              ) {
                return cb(null, false, {
                  message: "Incorrect username or password.",
                });
              }

              var user = {
                user_id: userData.user_id.toString(),
                username: userData.username,
                displayName: userData.name,
              };
              return cb(null, user);
            }
          );
        }
      );
    })
  );

  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      cb(null, { user_id: user.user_id, username: user.username });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};
