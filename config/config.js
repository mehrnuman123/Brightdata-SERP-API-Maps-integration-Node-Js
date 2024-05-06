require('dotenv').config();
let config;

if (process.env.NODE_ENV === 'production') {
  config = {
    PORT: process.env.PORT || 80,
    DB_URL: process.env.DB_URL || 'mongodb://production-server:27017/mydatabase_prod',
    JWT_SECRET: process.env.JWT_SECRET || 'your_production_secret_key',
  };
} else {
  config = {
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/mydatabase_dev',
    JWT_SECRET: process.env.JWT_SECRET || 'mysecretkey',
  };
}

module.exports = config;
