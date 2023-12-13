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
  totalAmount: {
    type: Number,
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'cartId',
    select: 'userId',
  });

  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
