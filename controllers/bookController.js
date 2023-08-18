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
  const book = new Book(null, ...Object.values(req.body));
  try {
    const dbRes = await query(queriesList.ADD_BOOK, [...Object.values(book)]);
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

module.exports = {
  getBookList,
  getBookById,
  addBook,
};
