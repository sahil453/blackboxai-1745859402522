const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ratings: {
    taste: { type: Number, min: 1, max: 5, required: true },
    price: { type: Number, min: 1, max: 5, required: true },
    ambiance: { type: Number, min: 1, max: 5, required: true },
    view: { type: Number, min: 1, max: 5, required: true },
    vibe: { type: Number, min: 1, max: 5, required: true }
  },
  reviewText: { type: String },
  photoUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
