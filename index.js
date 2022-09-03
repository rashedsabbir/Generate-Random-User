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

// Save a user in the .json file validate the body and check if all the required properties are present in the body.
app.post("/user/save", (req, res) => {
    const allUsers = fs.readFileSync("UserData/userData.json", "utf-8");
    const user = JSON.parse(allUsers);
    const newUser = req.body;
    if (newUser.id && newUser.name && newUser.contact && newUser.address && newUser.photoUrl && newUser.gender) {
      user.push(newUser);
      fs.writeFileSync("UserData/userData.json", JSON.stringify(user));
      res.send(user);
    } else {
      res.status(400).send("Bad Request - Missing some properties");
    }
  }),

// get all userData 
app.get("/user/all", (req, res) => {
    const allUsers = fs.readFileSync("UserData/userData.json", "utf-8");
    const user = JSON.parse(allUsers);
    const userLimit = req.query.userLimit;
    if (userLimit) {
      res.send(user.slice(0, userLimit));
    } else {
      res.send(user);
    }
  });

// get random userData
app.get("/user/random",  (req, res) => {
    const allUsers = fs.readFileSync('UserData/userData.json', 'utf8');
    const randomUser = JSON.parse(allUsers)[Math.floor(Math.random() * JSON.parse(allUsers).length)];
    res.send(randomUser);
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