const express = require("express");
const cors = require("cors");
const routes = require("../routes/routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/images", express.static("public"));

app.use("/", routes);

module.exports = app;
