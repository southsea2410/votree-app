const Product = require('../models/productModel');

exports.getAllProduct = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }

    const products = await query;

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products: products,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const sellerId = req.sellerId || req.body.sellerId; // Assuming sellerId is provided
    const productData = { ...req.body, sellerId }; // Include sellerId in the product data

    const newProduct = await Product.create(productData);

    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews');

    res.status(200).json({
      status: 'success',
      data: {
        product: product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'name',
      'price',
      'discountPrice',
      'quantity',
      'description',
      'active',
      'type',
      'suitEnvironment',
      'suitClimate',
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update),
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};
