const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const logger = require('./config/logger');

const PORT = 3000;

const app = express();
app.use(express.json());
app.use('/api/v1/products', productRoutes);

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb';

mongoose.connect(mongoUri, {
}).then(() => {
    logger.info('MongoDB connected');
  app.listen(PORT, () => {
    logger.info(`running on port ${PORT}`);
  });
}).catch(err => {
    logger.error(`MongoDB connection error: ${err.message}`);
});
