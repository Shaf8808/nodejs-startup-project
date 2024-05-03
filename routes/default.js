const express = require("express");

const router = express.Router(); // Router is a pre-built package within express

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
