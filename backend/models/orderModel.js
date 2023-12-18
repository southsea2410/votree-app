const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    default: Date.now(),
  },
  cartId: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Cart',
    },
  ],
  paid: {
    type: Boolean,
    default: false,
  },
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'cartId',
    select: 'userId totalPrice totalQuantity image',
  });

  next();
});

// 4242424242424242: Accept
// 4000000000003220: Authentication
// 4000000000000002: Declined

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
