const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
  },
  averageRating: Number,
  numberOfRatings: Number,
});

restaurantSchema.index({ location: '2dsphere' });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
