const express = require("express");
const uuid = require("uuid"); // Package that creates a random id to each restaurant item

const resData = require("../utils/restaurant-data"); // Imports utils functions from relative path

const router = express.Router();

router.get("/restaurants", (req, res) => {
  const storedRestaurants = resData.getStoredRestaurants();

  storedRestaurants.sort((resA, resB) => {});

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

router.get("/restaurants/:id", (req, res) => {
  const restaurantId = req.params.id; // Stores the id of each restaurant item
  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      // The return keyword stops the function execution
      return res.render("restaurant-detail", { restaurant: restaurant });
      // The first restaurant is the key we use in restaurant-detail page
      // The second is the const in the for loop which is the full object as the value
    }
  }
  res.status(404).render("404");
});

router.get("/recommend", (req, res) => {
  res.render("recommend");
});

router.post("/recommend", (req, res) => {
  const restaurant = req.body; // This is the full data object submitted by the user
  restaurant.id = uuid.v4(); // Gives a unique id to each restaurant
  const storedRestaurants = resData.getStoredRestaurants(); // Calls utils function from file

  storedRestaurants.push(restaurant); // Gets pushed to original data array
  resData.storeRestaurants(storedRestaurants); // Calls utils function from file

  res.redirect("/restaurants");
});

router.get("/confirm", (req, res) => {
  res.render("confirm");
});

module.exports = router;
