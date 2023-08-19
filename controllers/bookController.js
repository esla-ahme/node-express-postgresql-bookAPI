const { query, queriesList } = require("../db/dbQuery");
const Book = require("../models/bookModel");
const { validateId, validateExistence } = require("../utils/validation");

const getBookList = async (req, res) => {
  try {
    let booksData = await query(queriesList.GET_BOOK_LIST);
    let books = booksData.rows;
    res.status(200).send({
      status: "success",
      length: books.length,
      message: books.length > 0 ? "books fetched successfully" : "No books yet",
      data: books,
    });
  } catch (err) {
    console.log(err);
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
      return res.status(404).send({
        status: "failed",
        message: "book not found",
      });
    }
    res.status(200).send({
      status: "success",
      message: "book fetched successfully",
      data: book,
    });
  } catch (err) {
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
  if (!title || !author || !publisher || !desciption || !storesId || !Number(storesId)) {
    return res.status(400).send({
      status: "failed",
      message: "required fields are missing",
    });
  }
  const book = new Book({
    ...req.body,
  });
  delete book.bookId;
  //   console.log(Object.keys(book), Object.values(book));
  try {
    // check if the new storesId exists in the database
    await validateExistence(storesId, "store");
    const dbRes = await query(queriesList.ADD_BOOK, Object.values(book));
    console.log(dbRes);
    res.status(201).send({
      status: "success",
      message: "book added successfully",
      data: { ...book, bookId: dbRes.rows[0].bookid },
    });
  } catch (err) {
    console.log(err);
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
      return res.status(404).send({
        status: "failed",
        message: "book not found",
      });
    }
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

    //delete bookId
    delete book.bookId;

    console.log("2", book);
    const dbRes = await query(queriesList.EDIT_BOOK, [
      ...Object.values(book),
      bookId,
    ]);

    res.status(200).send({
      status: "success",
      message: "book edited successfully",
      data: dbRes.rows[0],
    });
  } catch (err) {
    console.log(err);
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
    return res.status(400).send({
      status: "failed",
      message: "valid book id (number) is required",
    });
  }

  try {
    const dbRes = await query(queriesList.DELETE_BOOK, [bookId]);
    if (!dbRes.rowCount) {
      return res.status(404).send({
        status: "failed",
        message: "book does not exist",
      });
    }
    res.status(200).send({
      status: "success",
      message: "book deleted successfully",
      data: dbRes,
    });
  } catch (err) {
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
