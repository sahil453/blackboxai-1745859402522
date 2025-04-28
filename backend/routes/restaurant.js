const express = require('express');
const Restaurant = require('../models/Restaurant');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create a new restaurant
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, address, location, phone, website } = req.body;
    if (!name || !address || !location || !location.coordinates) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const restaurant = new Restaurant({ name, address, location, phone, website });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    console.error('Create restaurant error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all restaurants (with optional search by name)
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    const restaurants = await Restaurant.find(query).limit(50);
    res.json(restaurants);
  } catch (err) {
    console.error('Get restaurants error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (err) {
    console.error('Get restaurant error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
