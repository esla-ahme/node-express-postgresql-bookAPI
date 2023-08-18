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

// queries
const queriesList = {
  GET_STORE_LIST: "SELECT * FROM stores",
  GET_STORE_BY_ID: "SELECT * FROM stores WHERE storeId = $1",
ADD_STORE: "INSERT INTO stores (name, address) VALUES ($1, $2)",
  GET_BOOK_LIST: "SELECT * FROM books",
}


module.exports = {
  query: executeQuery,
  queriesList,
};
