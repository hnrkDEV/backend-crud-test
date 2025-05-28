const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const logger = require('./config/logger');
const { swaggerUi, specs } = require('./docs/swagger');
const globalErrorHandler = require('../middlewares/globalErrorHandler');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/v1/products', productRoutes);


if (process.env.NODE_ENV !== 'test') {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb';

  mongoose.connect(mongoUri).then(() => {
    logger.info('MongoDB connected');
    app.listen(PORT, () => {
      logger.info(`running on port ${PORT}`);
    });
  }).catch(err => {
    logger.error(`MongoDB connection error: ${err.message}`);
  });
}
app.use(globalErrorHandler);

module.exports = app;
