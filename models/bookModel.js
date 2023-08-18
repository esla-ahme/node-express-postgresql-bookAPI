class Book {
  constructor(book) {
    this.bookId = book.bookId || null; // we need it null for insert
    this.title = book.title;
    this.author = book.author;
    this.isbn = book.isbn;
    this.publisher = book.publisher;
    this.pages = book.pages;
    this.desciption = book.desciption;
    this.releaseDate = book.releaseDate;
    this.storesId = book.storesId;
  }
}

module.exports = Book;
