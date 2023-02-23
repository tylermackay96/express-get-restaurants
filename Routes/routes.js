const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");



// Get all restaurants
router.get("/restaurants", (req, res) => {
  res.json(restaurants);
});

// Get a single restaurant by ID
router.get("/restaurants/:id", (req, res) => {
  const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
  if (!restaurant) return res.status(404).send("Restaurant not found");
  res.json(restaurant);
});

// Create a new restaurant
router.post("/restaurants", [
  check("name").not().isEmpty(),
  check("address").not().isEmpty(),
  check("rating").isFloat({ min: 0, max: 5 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const newRestaurant = {
    id: restaurants.length + 1,
    name: req.body.name,
    address: req.body.address,
    rating: parseFloat(req.body.rating)
  };
  restaurants.push(newRestaurant);
  res.json(newRestaurant);
});

// Update an existing restaurant by ID
router.put("/restaurants/:id", [
  check("name").not().isEmpty(),
  check("address").not().isEmpty(),
  check("rating").isFloat({ min: 0, max: 5 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
  if (!restaurant) return res.status(404).send("Restaurant not found");
  restaurant.name = req.body.name;
  restaurant.address = req.body.address;
  restaurant.rating = parseFloat(req.body.rating);
  res.json(restaurant);
});

// Delete an existing restaurant by ID
router.delete("/restaurants/:id", (req, res) => {
  const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
  if (!restaurant) return res.status(404).send("Restaurant not found");
  restaurants = restaurants.filter(r => r.id !== parseInt(req.params.id));
  res.json(restaurants);
});

module.exports = router;
