const Product = require('../models/productModel');
const logger = require('../config/logger');
const catchAsync = require('../utils/catchAsync');

exports.createProduct = catchAsync(async(req, res, next) => {
    const newProduct = await Product.create(req.body);
    logger.info(`product ${newProduct.name} created successfully!`);

    res.status(201).json({
    status: 'success',
    data: {
    product: newProduct
  }
  });
});

exports.listProducts = catchAsync(async(req, res, next) => {
  const products = await Product.find();

  logger.info(`found ${products.length} products.`)
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products
    }
  });
});


exports.getProduct = catchAsync(async(req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({
      status: 'fail',
      message: 'Product not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      product
    }
  });
});


exports.deleteProduct = catchAsync(async(req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({
      status: 'fail',
      message: 'Product not found'
    });
  };
  
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.updateProduct = catchAsync(async(req, res, next) => {
  const updatedProd = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})

  if(!updatedProd)  {
    logger.error(`Product with id ${updatedProd._id} not found`);
    return res.status(404).json({status: 'fail', message: 'product not found!'});
  };

    logger.info('Product updated successfully!')
  res.status(200).json({
    status: 'success',
    data: {
      product: updatedProd
    }
  });
});