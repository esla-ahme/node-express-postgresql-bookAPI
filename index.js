const dotenv = require("dotenv");
const express = require("express");
const { query } = require("./db/dbQuery");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

query("INSERT INTO books (bookId,title) VALUES ($1,$2)", [
  1,
  "A Song of Ice and Fire",
])
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err.detail);
  });

query("SELECT * FROM books").then((data) => {
  console.log(data.rows);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("listening on port 5000");
});
