const Pool = require("pg").Pool;

// const env = process.env.NODE_ENV || "development";

// let connectionString = {
//   user: "mitchellwalters",
//   host: "localhost",
//   port: 5432,
//   database: "jamband",
// };

// if (env !== "development") {
let connectionString = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
};
// }
const pool = new Pool(connectionString);

module.exports = pool;
