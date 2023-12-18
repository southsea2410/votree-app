const orderModel = require('../models/orderModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1. Get the currently booked products in cart
  const cart = await Cart.findById(req.params.cartId).populate(
    'products.product',
  );
  const user = await User.findById(cart.user);
  // 2. Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // success_url: `${req.protocol}://${req.get(
    //   'host',
    // )}/success?session_id={CHECKOUT_SESSION_ID}`,
    success_url: `https://votreecommunity.web.app/`,
    cancel_url: `${req.protocol}://${req.get('host')}/cancel`,
    customer_email: user.email,
    client_reference_id: req.params.cartId,
    line_items: cart.products.map((item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.name,
            // images: [
            //   `${req.protocol}://${req.get(
            //     'host',
            //   )}/img/products/ASSORTED_SUCCULENT_ARRANGEMENT.jpeg`,
            // ],
            images: [item.product.image],
          },
          unit_amount: item.product.price * 100, // price in cents
        },
        quantity: item.count,
      };
    }),
    mode: 'payment',
  });

  // 3. Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.createOrderCheckout = catchAsync(async (req, res, next) => {
  // This is only temporary, because it's unsecure: everyone can make bookings without paying
  const { cartId } = req.params;
  const cart = await Cart.findById(cartId).populate('products');
  const products = cart.products;
  products.forEach(async (product) => {
    // Exact the product quantity of seller and update it
    const seller = await User.findById(product.seller);
    const sellerProduct = seller.products.find(
      (sellerProduct) => sellerProduct.product.toString() === product.id,
    );
    sellerProduct.quantity -= product.quantity;
    await seller.save();
  });
  await Cart.findByIdAndDelete(cartId);
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.createOrder = factory.createOne(orderModel);
exports.getAllOrders = factory.getAll(orderModel);
exports.getOrder = factory.getOne(orderModel);
exports.updateOrder = factory.updateOne(orderModel);
exports.deleteOrder = factory.deleteOne(orderModel);
