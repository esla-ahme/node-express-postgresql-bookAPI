const { query, queriesList } = require("../db/dbQuery");
const Book = require("../models/bookModel");
const { validateId, validateExistence } = require("../utils/validation");

const Logger = require("../services/logger");
const logger = new Logger("bookController");
const getBookList = async (req, res) => {
  try {
    let booksData = await query(queriesList.GET_BOOK_LIST);
    let books = booksData.rows;
    logger.info("books fetched successfully", books);
    res.status(200).send({
      status: "success",
      length: books.length,
      message: books.length > 0 ? "books fetched successfully" : "No books yet",
      data: books,
    });
  } catch (err) {
    logger.error("failed to fetch books", err);
    res.status(500).send({
      status: "failed",
      message: "failed to fetch books",
      error: err,
    });
  }
};

const getBookById = async (req, res) => {
  let { bookId } = req.params;
  bookId = Number(bookId);
  if (!bookId) {
    return res.status(400).send({
      status: "failed",
      message: "valid book id (number) is required",
    });
  }
  try {
    let bookData = await query(queriesList.GET_BOOK_BY_ID, [bookId]);
    let book = bookData.rows[0];
    if (!book) {
      logger.error("book not found");
      return res.status(404).send({
        status: "failed",
        message: "book not found",
      });
    }
    logger.info("book fetched successfully", book);
    res.status(200).send({
      status: "success",
      message: "book fetched successfully",
      data: book,
    });
  } catch (err) {
    logger.error("failed to fetch book", err);
    res.send({
      status: "failed",
      message: "failed to fetch book",
      error: err,
    });
  }
};

/*
    example json body
    {
        

    }  
*/

const addBook = async (req, res) => {
  let {
    title,
    author,
    isbn,
    publisher,
    pages,
    desciption,
    releaseDate,
    storesId,
  } = req.body;
  // validate required fields
  if (
    !title ||
    !author ||
    !publisher ||
    !desciption ||
    !storesId ||
    !Number(storesId)
  ) {
    logger.error("required fields are missing");
    return res.status(400).send({
      status: "failed",
      message: "required fields are missing",
    });
  }
  const book = new Book({
    ...req.body,
  });
  delete book.bookId;
  logger.debug("book object", book);
  try {
    // check if the new storesId exists in the database
    await validateExistence(storesId, "store");
    const dbRes = await query(queriesList.ADD_BOOK, Object.values(book));
    logger.info("book added successfully", dbRes.rows[0]);
    res.status(201).send({
      status: "success",
      message: "book added successfully",
      data: { ...book, bookId: dbRes.rows[0].bookid },
    });
  } catch (err) {
    logger.error("failed to add book", err);
    res.status(500).send({
      status: "failed",
      message: "failed to add book: " + err.message || err.detail,
      error: err,
    });
  }
};

const editBook = async (req, res) => {
  const { bookId } = req.params;
  validateId(bookId, true); // throw error if bookId is not a number
  try {
    const existingBook = await query(queriesList.GET_BOOK_BY_ID, [bookId]);
    if (!existingBook.rows[0]) {
      logger.error("book not found");
      return res.status(404).send({
        status: "failed",
        message: "book not found",
      });
    }
    logger.debug("existing book", existingBook.rows[0]);
    // check if the new storesId exists in the database
    const { storesId } = req.body;
    if (storesId) {
      validateId(storesId, true);
      await validateExistence(storesId, "store");
    }
    // releaseDate and storesId are all lowercase in database so we need to convert it manually
    // also override existingBook with new values from request body
    let book = new Book({
      ...existingBook.rows[0],
      releaseDate: existingBook.rows[0].releasedate,
      storesId: existingBook.rows[0].storesid,
      ...req.body,
    });
    logger.debug("book object to be added to database", book);

    //delete bookId
    delete book.bookId;

    const dbRes = await query(queriesList.EDIT_BOOK, [
      ...Object.values(book),
      bookId,
    ]);
    logger.info("book edited successfully", dbRes.rows[0]);
    res.status(200).send({
      status: "success",
      message: "book edited successfully",
      data: dbRes.rows[0],
    });
  } catch (err) {
    logger.error("failed to edit book", err);
    res.status(500).send({
      status: "failed",
      message: "failed to edit book: " + err.message || err.detail,
      error: err,
    });
  }
};

const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  if (!Number(bookId)) {
    logger.error("valid book id (number) is required");
    return res.status(400).send({
      status: "failed",
      message: "valid book id (number) is required",
    });
  }

  try {
    const dbRes = await query(queriesList.DELETE_BOOK, [bookId]);
    if (!dbRes.rowCount) {
      logger.error("book does not exist");
      return res.status(404).send({
        status: "failed",
        message: "book does not exist",
      });
    }
    logger.info("book deleted successfully", dbRes);
    res.status(200).send({
      status: "success",
      message: "book deleted successfully",
      data: dbRes,
    });
  } catch (err) {
    logger.error("failed to delete book", err);
    res.status(500).send({
      status: "failed",
      message: "failed to delete book",
      error: err,
    });
  }
};

module.exports = {
  getBookList,
  getBookById,
  addBook,
  editBook,
  deleteBook,
};
