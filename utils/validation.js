const { query, queriesList } = require("../db/dbQuery");

/**
 * Validates an id and returns true if the id is a number, false otherwise.
 *
 * @param {any} id - The id to be validated.
 * @param {boolean} [exception=false] - Whether to throw an exception if the id is not valid.
 * @return {boolean | Error} - True if the id is a number, false otherwise.
 */
const validateId = (id, exception = false) => {
  if (!Number(id)) {
    if (exception) throw new Error("valid id (number) is required");
    else return false;
  }
  return true;
};

/**
 * Checks the existence of a book or a store based on the given ID and type.
 *
 * @param {number} id - The ID of the book or store to check.
 * @param {string} type - The type of the object to check ("book" or "store").
 * @return {boolean} Returns true if the object exists, false otherwise.
 */
const validateExistence = async (id, type) => {
  let isExisted = false;
  switch (type) {
    case "book":
      const bookData = await query(queriesList.BOOK_EXISTANCE, [id]);
      isExisted = bookData.rows[0].book_exists;
    case "store":
      const storeData = await query(queriesList.STORE_EXISTANCE, [id]);
      isExisted = storeData.rows[0].store_exists;
    default:
      break;
  }
  if (!isExisted) {
    throw new Error(`No ${type} is found with id ${id}`);
  }
};

module.exports = {
  validateId,
  validateExistence,
};
