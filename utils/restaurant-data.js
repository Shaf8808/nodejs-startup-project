const fs = require("fs");
const path = require("path");

// ".." goes up one level to the data folder
const filePath = path.join(__dirname, "..", "data", "restaurants.json"); // Looks for the path in the directory

function getStoredRestaurants() {
  const fileData = fs.readFileSync(filePath); // Reads the json file
  const storedRestaurants = JSON.parse(fileData);
  return storedRestaurants;
}

function storeRestaurants(storableRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants)); // takes the file path and returns parsed data as a string in the json file
}

// The first is the key used in other files,
// the second is the value used in this file

module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  storeRestaurants: storeRestaurants,
};
