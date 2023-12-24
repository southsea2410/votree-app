const Product = require('../models/productModel');
const Seller = require('../models/sellerModel');
const {
  checkInvidualPermissions,
} = require('../utils/checkIndividualPermissions');

exports.getAllProduct = async (req, res) => {
  try {
    // const queryObj = { ...req.query };
    // const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // excludedFields.forEach((el) => delete queryObj[el]);

    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // let query = Product.find(JSON.parse(queryStr));

    // if (req.query.sort) {
    //   query = query.sort(req.query.sort);
    // }

    // const products = await query
    //   .populate({
    //     path: 'sellerInfo',
    //     populate: {
    //       path: 'userInfo',
    //       select: 'fullName', // Select only the fullName field from the User document
    //     },
    //   })
    //   .exec((err, products) => {
    //     // Handle err and use products
    //   });

    const products = await Product.find().populate({
      path: 'sellerInfo',
      populate: {
        path: 'userInfo',
        select: 'fullName', // Select only the fullName field from the User document
      },
    });

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

    const seller = await Seller.findById(sellerId);
    seller.products.push(newProduct._id);

    await seller.save();

    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct,
        seller: seller,
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
    // const product = await Product.findById(req.params.productId).populate(
    //   'reviews',
    // );
    // checkInvidualPermissions(req.user.userId, product.sellerId);
    const products = await Product.findById(req.params.id).populate({
      path: 'sellerInfo',
      populate: {
        path: 'userInfo',
        select: 'fullName', // Select only the fullName field from the User document
      },
    });
    res.status(200).json({
      status: 'success',
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

    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

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
