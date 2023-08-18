# BOOK API
 A bookshop API that allows users to create, read, update and delete books, and to create, read, update and delete stores and manage them.

## Technologies
1. Node.js
2. Express
3. Postgresql

## EndPoints
_Get all books_ | 
`GET api/v1/books`

_Get book by id_ | `GET api/v1/books/:id`

_Add book_ | `POST api/v1/books/add`

_Update book_ | `PUT api/v1/books/update` 

_delete book_ |
`DELETE /books/delete/:id`

## Dependencies and Requirements

[Nodemon](https://www.npmjs.com/package/nodemon) is required for running the app.

[Postgresql](https://www.postgresql.org/) is required for running the app, edit `DATABASE_URL` in `.env` file to match your database.
Table creation screpts are in [Scripts](./db/scripts.js) file.

ER Diagram 
![ERD](./book_erd.png)

## run app
To run the app
```bash
npm install
npm start 
```
the app must start serving on http://localhost:5000

