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
  STORE_EXISTANCE:
    "SELECT EXISTS (SELECT 1 FROM stores WHERE storeId = $1) AS store_exists",
  ADD_STORE:
    "INSERT INTO stores (name, address) VALUES ($1, $2) RETURNING storeid",
  GET_BOOK_LIST: "SELECT * FROM books",
  GET_BOOK_BY_ID: "SELECT * FROM books WHERE bookId = $1",
  BOOK_EXISTANCE:
    "SELECT EXISTS (SELECT 1 FROM books WHERE bookId = $1) AS book_exists",
  ADD_BOOK:
    "INSERT INTO books (title, author, isbn, publisher, pages, desciption, releaseDate, storesId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING bookid",

  EDIT_BOOK:
    "UPDATE books SET title = $1, author = $2, isbn = $3, publisher = $4, pages = $5, desciption = $6, releaseDate = $7, storesId = $8 WHERE bookId = $9",
  DELETE_BOOK: "DELETE FROM books WHERE bookId = $1",
  ADD_AUDIT:
    "INSERT INTO audit (audit_action, audit_data, audit_status, audit_error, audit_by, audit_on) VALUES ($1, $2, $3, $4, $5, $6) RETURNING audit_id",
};


module.exports = {
  query: executeQuery,
  queriesList,
};
