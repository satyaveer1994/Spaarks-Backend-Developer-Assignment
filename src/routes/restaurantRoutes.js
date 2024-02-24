const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const authenticateToken=require("../Middleware/authentication")

router.post('/distance-range', authenticateToken, restaurantController.getRestaurantsByDistanceRange);

router.post('/nearby', authenticateToken, restaurantController.getRestaurantsByRadius);

module.exports = router;
