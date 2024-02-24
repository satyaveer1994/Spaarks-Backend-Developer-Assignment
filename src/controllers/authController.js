const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


exports.register = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the username is already taken
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(400).json({ error: 'Username is already taken' });
      }
  
      // Create a new user
      const newUser = new User({ username, password });
  
      // Save the user to the database
      await newUser.save();
  
      res.json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Implement logic to verify user credentials (e.g., check against the database)
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
