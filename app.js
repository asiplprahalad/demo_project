const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const quotationRoutes = require('./routes/quotation');

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api', quotationRoutes);

// Start server
const port = config.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
