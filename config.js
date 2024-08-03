module.exports = {
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/invoice-generator',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    PORT: process.env.PORT || 5000
  };
  