const express = require("express");
const cors = require("cors");
const fs = require("fs");
const routes = require("../routes/routes");

const file = fs.readFileSync("./E63A15CEDBFDC045D7CEBFE256FA303B.txt");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/images", express.static("public"));
app.use("/practice", express.static("public/practice"));

app.use("/", routes);

app.get(
  "/.well-known/pki-validation/E63A15CEDBFDC045D7CEBFE256FA303B.txt",
  (req, res) => {
    res.sendFile(
      "/home/ubuntu/tobias_project_backend/E63A15CEDBFDC045D7CEBFE256FA303B.txt"
    );
  }
);

module.exports = app;
