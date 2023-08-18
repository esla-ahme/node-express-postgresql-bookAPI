const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const BASE_URL = "/api/v1";

app.use(`${BASE_URL}/stores`, require("./routes/storeRoute"));
// app.use(`${BASE_URL}/books`, require("./routes/bookRoute"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("listening on port 5000");
});