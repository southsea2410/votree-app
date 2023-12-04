const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  sellerId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Seller',
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
  ],
  orderDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['pending', 'delivered', 'cancelled'],
    default: 'pending',
  },
  cartId: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Cart',
    },
  ],
  shippingDetails: {
    address: String,
    city: String,
    postalCode: String,
    country: String,
  },
  totalAmount: {
    type: Number,
  },
  paymentMethods: {
    type: String,
    enum: ['COD', 'Credit Card', 'Debit Card', 'UPI'],
    default: 'COD',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
