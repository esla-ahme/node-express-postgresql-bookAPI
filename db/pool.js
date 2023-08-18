require("dotenv").config();
const { Pool } = require("pg");

const db_config = {
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 300,
  max: 10,
  idleTimeoutMillis: 200,
};
const pool = new Pool(db_config);

module.exports = pool;
