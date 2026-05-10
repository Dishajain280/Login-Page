const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

const templatePath = path.join(__dirname, "../templates");
const publicPath = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.static(publicPath));
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };

  try {
    await collection.insertMany([data]);
    res.render("home");
  } catch (error) {
    console.error("Signup error:", error);
    res.send(
      "An error occurred during signup. Please ensure MongoDB is running.",
    );
  }
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.name });
    if (check && check.password === req.body.password) {
      res.render("home");
    } else {
      res.send("wrong password or user does not exist");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.send("wrong details or MongoDB connection issue");
  }
});

app.listen(3000, () => {
  console.log("port connected");
});


module.exports = app;