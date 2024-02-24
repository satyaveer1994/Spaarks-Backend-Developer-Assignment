const Restaurant = require('../models/restaurant');


// Controller function to get restaurants based on location and distance range
const getRestaurantsByDistanceRange = async (req, res) => {
    try {
      const { latitude, longitude, minDistance, maxDistance } = req.body;
  
      // Check if minDistance and maxDistance are valid numbers
      if (isNaN(minDistance) || isNaN(maxDistance) || minDistance < 0 || maxDistance < 0) {
        return res.status(400).json({ error: 'Invalid distance range provided' });
      }
  
      // Implement logic to query MongoDB for restaurants within the specified distance range
      const restaurants = await Restaurant.find({
        location: {
          $geoWithin: {
            $centerSphere: [[longitude, latitude], maxDistance / 6378.1], // Convert maxDistance to radians
          },
        },
      }).where('location').near({
        center: { type: 'Point', coordinates: [longitude, latitude] },
        maxDistance: maxDistance,
        minDistance: minDistance,
      });
  
      res.json({ restaurants });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

// Controller function to get restaurants based on location and radius
const getRestaurantsByRadius = async (req, res) => {
    try {
      // Extract latitude, longitude, and radius from the request body
      const { latitude, longitude, radius } = req.body;
  
      // Check if radius is a valid number
      if (isNaN(radius) || radius <= 0) {
        return res.status(400).json({ error: 'Invalid radius provided' });
      }
  
      // Implement logic to query MongoDB for restaurants within the specified radius
      const restaurants = await Restaurant.find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: radius,
          },
        },
      });
  
      // Respond with the list of restaurants
      res.json({ restaurants });
    } catch (error) {
      console.error(error);
      // Handle internal server error
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
module.exports = { getRestaurantsByDistanceRange, getRestaurantsByRadius };
