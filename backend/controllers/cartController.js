const cartModel = require('../models/cartModel');
const productModel = require('../models/productModel');
const sellerModel = require('../models/sellerModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createCart = catchAsync(async (req, res, next) => {
  try {
    const cart = await cartModel.create({
      products: req.body.products,
      user: req.body.user,
      seller: req.body.seller,
    });
    res.status(201).json({
      status: 'success',
      data: {
        cart,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
});

exports.getAllCarts = catchAsync(async (req, res, next) => {
  try {
    const carts = await cartModel.find();
    res.status(200).json({
      status: 'success',
      results: carts.length,
      data: {
        carts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
});

exports.getCart = catchAsync(async (req, res, next) => {
  try {
    const cart = await cartModel.findById(req.params.cartId);
    res.status(200).json({
      status: 'success',
      data: {
        cart,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
});

exports.deleteCart = catchAsync(async (req, res, next) => {
  try {
    const cart = await cartModel.findByIdAndDelete(req.params.cartId);
    if (!cart) {
      return next(new AppError('No cart found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
});

exports.updateCart = async (req, res) => {
  try {
    const { productId, count } = req.body;
    const userId = req.user.userId; // Assuming user ID is obtained from request object

    if (!count || count < 1) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid count. Count must be at least 1.',
      });
    }

    // Find the cart by ID
    const cart = await cartModel.findById(req.params.cartId);

    // Check if the cart exists and if the user is valid
    if (!cart || !cart.user || cart.user.toString() !== userId) {
      return res.status(404).json({
        status: 'fail',
        message: 'Cart not found or user mismatch',
      });
    }

    // Check if the product already exists in the cart
    const productIndex = cart.products.findIndex(
      (item) => item.product && item.product._id.toString() == productId,
    );

    if (productIndex > -1) {
      // Product exists, update the count
      cart.products[productIndex].count = count;
    } else {
      // Product does not exist, add it to the cart
      cart.products.push({ product: productId, count });
    }
    await cart.save();

    res.status(200).json({
      status: 'success',
      data: {
        cart,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.getCartProducts = catchAsync(async (req, res, next) => {
  const cart = await cartModel.findById(req.params.cartId).populate('products');
  res.status(200).json({
    status: 'success',
    data: {
      cart,
    },
  });
});

exports.deleteCartProduct = catchAsync(async (req, res, next) => {
  const cart = await cartModel.findById(req.params.cartId);
  const product = await productModel.findById(req.params.productId);
  if (!cart.products.includes(product.id)) {
    return next(new AppError('Product not in cart', 404));
  }
  cart.products.splice(cart.products.indexOf(product.id), 1);
  await cart.save();
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
