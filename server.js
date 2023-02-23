const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");

const port = 3000;

app.use(express.json());

//TODO: Create your GET Request Route Below: 
app.get("/restaurants/:id", async (req, res) => {
  const {id} = req.params;
  const restaurants = await Restaurant.findByPk(id);
  res.json(restaurants);
});

// Create a new restaurant
app.post("/restaurants", async (req, res) => {
  const {name, address, phone} = req.body;
  const restaurant = await Restaurant.create({name, address, phone});
  res.json(restaurant);
});

// Update an existing restaurant
app.put("/restaurants/:id", async (req, res) => {
  const {id} = req.params;
  const {name, address, phone} = req.body;
  const [updated] = await Restaurant.update({name, address, phone}, {
    where: {id}
  });
  if (updated) {
    const updatedRestaurant = await Restaurant.findByPk(id);
    res.json(updatedRestaurant);
  } else {
    res.sendStatus(404);
  }
});

// Delete a restaurant
app.delete("/restaurants/:id", async (req, res) => {
  const {id} = req.params;
  const deleted = await Restaurant.destroy({
    where: {id}
  });
  if (deleted) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

// Get a restaurant by id
app.get("/restaurants/:id", async (req, res) => {
  const {id} = req.params;
  const restaurant = await Restaurant.findByPk(id);
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.sendStatus(404);
  }
});


app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})