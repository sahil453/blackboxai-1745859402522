require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dishfinder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

const authRoutes = require('./routes/auth');

// Basic route
app.get('/', (req, res) => {
  res.send('DishFinder Backend API is running');
});

const restaurantRoutes = require('./routes/restaurant');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);

const dishRoutes = require('./routes/dish');

const reviewRoutes = require('./routes/review');

// TODO: Add routes for users, dishes, reviews

app.use('/api/dishes', dishRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
