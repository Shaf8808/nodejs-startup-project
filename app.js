const path = require("path");
const express = require("express");
const fs = require("fs"); // File system package from Node js

const app = express();

app.set("views", path.join(__dirname, "views")); // Where it will find the template files
app.set("view engine", "ejs");

app.use(express.static("public")); // Allows the css and Js script files to be loaded
app.use(express.urlencoded({ extended: false })); // Parses incoming request data

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/restaurants", (req, res) => {
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath); // Reads the json file
  const storedRestaurants = JSON.parse(fileData);

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get("/recommend", (req, res) => {
  res.render("recommend");
});

app.post("/recommend", (req, res) => {
  const restaurant = req.body;
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath); // Reads the json file
  const storedRestaurants = JSON.parse(fileData); // Parses the json file

  storedRestaurants.push(restaurant); // Gets pushed to original data array
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants)); // takes the file path and returns parsed data as a string in the json file

  res.redirect("/restaurants");
});

app.get("/confirm", (req, res) => {
  res.render("confirm");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(3000);
