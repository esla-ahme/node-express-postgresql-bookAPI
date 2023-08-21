const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const BASE_URL = "/api/v1";

app.use(`${BASE_URL}/stores`, require("./routes/storeRoute"));
app.use(`${BASE_URL}/books`, require("./routes/bookRoute"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("listening on port 5000");
});