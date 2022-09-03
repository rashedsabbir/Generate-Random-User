const express = require("express");
const cors = require("cors");
const errorHandler = require('./MiddleWare/errorHandler');
const port = process.env.PORT || 5000;
const fs = require("fs");
const path = require("path")
const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);


process.on("unhandledRejection", (error) => {
    console.log(error.name, error.message);
    app.close(() => {
      process.exit(1);
    });
  });

app.get("/", (req, res) => {
    res.send("Random user server is running successfully");
  });

  app.all("*", (req, res) => {
    res.send("Looks like you've found the doorway to the great nothing.");
  });

  app.listen(port, () => {
    console.log(`Random user-api app listening on port ${port}`);
  });