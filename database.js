const Pool = require("pg").Pool;

const pool = new Pool({
  user: "mitchellwalters",
  host: "localhost",
  port: 5432,
  database: "jamband",
});

module.exports = pool;
