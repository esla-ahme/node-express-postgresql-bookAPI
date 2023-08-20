require("dotenv").config();
const { Pool } = require("pg");
const Logger = require("../services/logger");
const logger = new Logger("dbPool");

const db_config = {
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 300,
  max: 10,
  idleTimeoutMillis: 200,
};
const pool = new Pool(db_config);

pool.on("connect", () => {
  logger.info("connected to database");
});
pool.on("error", (err) => {
  logger.error("database connection error", err);
});
pool.on("remove", () => {
  logger.info("client removed");
});


module.exports = pool;
