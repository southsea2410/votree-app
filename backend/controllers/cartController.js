const cartModel = require('../models/cartModel');
const productModel = require('../models/productModel');
const sellerModel = require('../models/sellerModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.createCart = factory.createOne(cartModel);
exports.getAllCarts = factory.getAll(cartModel);
exports.getCart = factory.getOne(cartModel);
exports.updateCart = factory.updateOne(cartModel);
exports.deleteCart = factory.deleteOne(cartModel);

exports.addProduct = catchAsync(async (req, res, next) => {
  const product = await productModel.create(req.body);
  const seller = await sellerModel.findById(req.params.sellerId);
  seller.products.push(product.id);
  await seller.save();
  res.status(201).json({
    status: 'success',
    data: {
      product,
    },
  });
});

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
