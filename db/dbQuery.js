const pool = require("./pool");

/**
 * Executes a database query with the given query and values.
 *
 * @param {string} query - The query to execute.
 * @param {Array} values - The values to be inserted into the query.
 * @return {Promise} A promise that resolves with the result of the query.
 */
const executeQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values).then(resolve).catch(reject);
  });
};

module.exports = {
  query: executeQuery,
};
