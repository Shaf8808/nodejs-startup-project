const path = require("path");
const express = require("express");

const defaultRoutes = require("./routes/default"); // Imports routes from routes folder
const restRoutes = require("./routes/restaurants");

const app = express();

app.set("views", path.join(__dirname, "views")); // Where it will find the template files
app.set("view engine", "ejs");

app.use(express.static("public")); // Allows the css and Js script files to be loaded
app.use(express.urlencoded({ extended: false })); // Parses incoming request data

app.use("/", defaultRoutes); // Directs user to these routes after the slash
app.use("/", restRoutes);

// The function below handles any invalid requests by the user
// and responds with a 404 page

app.use((req, res) => {
  res.status(404).render("404");
});

app.use((error, req, res, next) => {
  res.status(500).render("500");
});

app.listen(3000);
