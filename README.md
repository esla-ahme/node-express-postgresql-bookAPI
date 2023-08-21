# BOOK API
 A bookshop API that allows users to create, read, update and delete books, and to create, read, update and delete stores and manage them.

## Technologies
1. Node.js
2. Express
3. Postgresql as database

## Installation
1. ### Clone the repo
   > git clone https://github.com/esla-ahme/node-express-postgresql-bookAPI

   >cd node-express-postgresql-bookAPI 
2. ### Dependencies and Requirements
    some dependencies are required for running the app

   1. [Nodemon](https://www.npmjs.com/package/nodemon) is required for running the app.

   2. [Postgresql](https://www.postgresql.org/) is required for running the app, edit `DATABASE_URL` in `.env` file to match your database.
    Table creation screpts are in [Scripts](./db/scripts.js) file.

    ER Diagram 
![ERD](./book_erd.png)

3. ### Run the server
    To run the app
    ```bash
    npm install
    npm start 
    ```
    the app must start serving on http://localhost:5000



## EndPoints
Swagger Documentation is available on http://localhost:5000/api-docs

_Get all books_ | 
`GET api/v1/books`

_Get book by id_ | `GET api/v1/books/:id`

_Add book_ | `POST api/v1/books/add`
_Update book_ | `PUT api/v1/books/update/:id` 

_delete book_ |
`DELETE /books/delete/:id`
<hr>

_Get all stores_ |  `GET api/v1/stores`

_Get store by id_ | `GET api/v1/stores/:id`

_Add store_ | `POST api/v1/stores/add`
## Services
- [x] Logger
- [x] AuditService
- [x] Swagger Documentation
- [ ] Authentication
- [ ] Testing