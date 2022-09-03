const express = require("express");
const cors = require("cors");
const errorHandler = require('./MiddleWare/errorHandler');
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler);


app.get("/", (req, res) => {
    res.send("Random user server is running successfully");
  });

  app.listen(port, () => {
    console.log(`Random user-api app listening on port ${port}`);
  });