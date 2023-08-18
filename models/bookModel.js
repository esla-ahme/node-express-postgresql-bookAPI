class Book {
  constructor(
    bookId,
    title,
    author,
    isbn,
    publisher,
    pages,
    desciption,
    releaseDate,
    storesId
  ) {
    this.bookId = bookId;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.publisher = publisher;
    this.pages = pages;
    this.desciption = desciption;
    this.releaseDate = releaseDate;
    this.storesId = storesId;
  }
}

module.exports = Book;
