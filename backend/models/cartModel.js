const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'Seller',
  },
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
