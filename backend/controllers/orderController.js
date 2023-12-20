const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1. Get the currently booked products in cart
  const cart = await Cart.findById(req.params.cartId);

  const user = await User.findById(cart.user);
  // 2. Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // success_url: `${req.protocol}://${req.get(
    //   'host',
    // )}/success?session_id={CHECKOUT_SESSION_ID}`,
    success_url: `https://votreecommunity.web.app/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.protocol}://${req.get('host')}/cancel`,
    customer_email: user.email,
    client_reference_id: req.params.cartId,
    line_items: cart.products.map((item) => {
      console.log(item.product.image);
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.name,
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

const createCheckoutSession = catchAsync(async (session) => {
  try {
    const cart = await Cart.findById(session.client_reference_id);
    await orderModel.create({
      cartId: cart._id,
      paid: 'true',
    });

    cart.products.forEach(async (item) => {
      const product = await productModel.findByIdandUpdate({
        _id: item.product._id,
        quantity: item.product.quantity - item.count,
      });
      // item.product.quantity -= item.count;
      // if (item.product.quantity === 0) {
      //   item.product.active = false;
      // }
    });
    await cart.save();
  } catch (err) {
    console.log(err);
  }
});

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_KEY,
    );
    if (event.type === 'checkout.session.completed')
      createCheckoutSession(event.data.object);

    res.status(200).json({
      received: true,
    });
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }
};

exports.createOrder = factory.createOne(orderModel);
exports.getAllOrders = factory.getAll(orderModel);
exports.getOrder = factory.getOne(orderModel);
exports.updateOrder = factory.updateOne(orderModel);
exports.deleteOrder = factory.deleteOne(orderModel);
