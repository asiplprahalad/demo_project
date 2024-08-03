const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function(req, res, next) {
  const token = req.header('Authorization');
  console.log('token----------->',token)
  if (!token) return res.status(401).json({ message: 'Auth token missing' });

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' });
  }
};