const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const jwt = require("jsonwebtoken");
require("dotenv").config();
// Generate a jwt secret key
// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

app.listen(5000, () => {
  console.log("Node js server started.");
});
