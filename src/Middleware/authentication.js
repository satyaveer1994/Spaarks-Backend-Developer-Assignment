
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - Token missing' });
    }
  
    jwt.verify(token, config.jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Forbidden - Invalid token' });
      }
      req.user = user;
      next();
    });
  }
  module.exports = authenticateToken;