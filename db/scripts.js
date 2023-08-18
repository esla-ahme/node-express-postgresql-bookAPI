// table creare script
const BOOK_TABLE_SCRIPT = `
CREATE TABLE IF NOT EXISTS books (
    bookId SERIAL PRIMARY KEY,
    title varchar(100) not null,
    author varchar(100) not null,
    isbn varchar(10) ,
    publisher varchar(100) not null,
    pages INTEGER,
    desciption text not null,
    releaseDate DATE,
    storesId SERIAL not null,
    FOREIGN KEY (storesId) REFERENCES stores(storeId)
)
`;

const STORE_TABLE_SCRIPT = `
CREATE TABLE IF NOT EXISTS stores (
    storeId SERIAL PRIMARY KEY,
    name TEXT,
    address TEXT
);  
`;
