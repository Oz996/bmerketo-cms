const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/products", require("./controllers/productController"));
app.use("/api", require("./controllers/userController"));
app.use("/api/orders", require("./controllers/orderController"));

module.exports = app;
