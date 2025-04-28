const express = require('express');
const Dish = require('../models/Dish');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create a new dish
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, restaurant, description, photoUrl } = req.body;
    if (!name || !restaurant) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const dish = new Dish({ name, restaurant, description, photoUrl });
    await dish.save();
    res.status(201).json(dish);
  } catch (err) {
    console.error('Create dish error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all dishes (with optional search by name)
router.get('/', async (req, res) => {
  try {
    const { search, restaurantId } = req.query;
    let query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (restaurantId) {
      query.restaurant = restaurantId;
    }
    const dishes = await Dish.find(query).limit(50).populate('restaurant');
    res.json(dishes);
  } catch (err) {
    console.error('Get dishes error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get dish by ID
router.get('/:id', async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id).populate('restaurant');
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.json(dish);
  } catch (err) {
    console.error('Get dish error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
