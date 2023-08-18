const dotenv = require("dotenv");
const express = require("express");
const app = express();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("listening on port 5000");
});