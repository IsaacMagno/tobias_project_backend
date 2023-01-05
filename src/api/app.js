const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("../routes/routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/images", express.static("public"));
app.use("/practice", express.static("public/practice"));

app.get(
  "/.well-known/pki-validation/E63A15CEDBFDC045D7CEBFE256FA303B.txt",
  (_req, res) => {
    res.sendFile(path.join(__dirname, "/E63A15CEDBFDC045D7CEBFE256FA303B.txt"));
  }
);

app.use("/", routes);

module.exports = app;
