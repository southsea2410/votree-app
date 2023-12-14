const orderModel = require('../models/orderModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/productModel');
const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1. Get the currently booked products in cart
  const cart = await Cart.findById(req.params.cartId).populate('products');
  const products = cart.products;

  // 2. Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/cart`,
    customer_email: req.user.email,
    client_reference_id: req.params.cartId,
    line_items: products.map((product) => {
      return {
        name: product.name,
        description: product.description,
        images: [
          `${req.protocol}://${req.get('host')}/img/products/${
            product.imageCover
          }`,
        ],
        amount: product.price * 100,
        currency: 'usd',
        quantity: product.quantity,
      };
    }),
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

// exports.webhookCheckout = (req, res, next) => {
//   const signature = req.headers['stripe-signature'];
//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET,
//     );
//   } catch (err) {
//     return res.status(400).send(`Webhook error: ${err.message}`);
//   }
//   if (event.type === 'checkout.session.completed')
//     createOrderCheckout(event.data.object);
//   res.status(200).json({
//     received: true,
//   });
// };

exports.createOrder = factory.createOne(orderModel);
exports.getAllOrders = factory.getAll(orderModel);
exports.getOrder = factory.getOne(orderModel);
exports.updateOrder = factory.updateOne(orderModel);
exports.deleteOrder = factory.deleteOne(orderModel);
