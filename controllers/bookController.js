const { query, queriesList } = require("../db/dbQuery");
const Book = require("../models/bookModel");

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
       "title":"Harry Potter and the Philosopher's Stone",
       "author":"J.K. Rowling",
       "isbn":"1234567890",
       "publisher":"Bloomsbury",
       "pages":223,
       "desciption":"Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling.",
       "releaseDate":"1997",
       "storesId":1

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
  if (!title || !author || !publisher || !desciption || !storesId) {
    return res.status(400).send({
      status: "failed",
      message: "required fields are missing",
    });
  }
  const book = new Book({
    ...req.body,
  });
  //   console.log(Object.keys(book), Object.values(book));
  try {
    const dbRes = await query(queriesList.ADD_BOOK, [
      ...Object.values(book).filter((x) => x !== null),
    ]);
    res.status(201).send({
      status: "success",
      message: "book added successfully",
      data: dbRes.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "failed to add book",
      error: err,
    });
  }
};

const editBook = async (req, res) => {
  const { bookId } = req.params;

  if (!Number(bookId)) {
    return res.status(400).send({
      status: "failed",
      message: "valid book id (number) is required",
    });
  }
  try {
    const existingBook = await query(queriesList.GET_BOOK_BY_ID, [bookId]);
    if (!existingBook.rows[0]) {
      return res.status(404).send({
        status: "failed",
        message: "book not found",
      });
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
      message: "failed to edit book: " + err.detail,
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
