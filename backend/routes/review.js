const express = require('express');
const Review = require('../models/Review');
const Dish = require('../models/Dish');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create a new review
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { dish, ratings, reviewText, photoUrl } = req.body;
    if (!dish || !ratings) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    // Validate ratings fields
    const requiredRatings = ['taste', 'price', 'ambiance', 'view', 'vibe'];
    for (const field of requiredRatings) {
      if (typeof ratings[field] !== 'number' || ratings[field] < 1 || ratings[field] > 5) {
        return res.status(400).json({ message: `Invalid rating for ${field}` });
      }
    }
    // Check dish exists
    const dishExists = await Dish.findById(dish);
    if (!dishExists) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    const review = new Review({
      dish,
      user: req.user.id,
      ratings,
      reviewText,
      photoUrl
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error('Create review error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get reviews for a dish
router.get('/dish/:dishId', async (req, res) => {
  try {
    const reviews = await Review.find({ dish: req.params.dishId })
      .populate('user', 'username')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(reviews);
  } catch (err) {
    console.error('Get reviews error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
