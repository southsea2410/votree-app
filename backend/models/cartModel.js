const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
        },
        count: {
          type: Number,
          required: true,
          min: [1, 'Quantity must be at least 1'],
        },
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
    totalPrice: {
      type: Number,
    },
    totalQuantity: {
      type: Number,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

cartSchema.pre('save', async function (next) {
  let totalQuantity = 0;
  let totalPrice = 0;

  for (let item of this.products) {
    totalQuantity += item.count;

    // Fetch the product using its ID
    const product = await mongoose.model('Product').findById(item.product);
    if (product) {
      totalPrice += product.price * item.count;
    }
  }

  this.totalQuantity = totalQuantity;
  this.totalPrice = totalPrice;

  next();
});

cartSchema.methods.calculateTotals = function () {
  let totalQuantity = 0;
  let totalPrice = 0;

  this.products.forEach((product) => {
    totalQuantity += product.count;
    totalPrice += product.product.price * product.count; // Note: Ensure product price is available
  });

  this.totalQuantity = totalQuantity;
  this.totalPrice = totalPrice;
};

// Populate the product details
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'products.product',
    select: 'name price',
  });

  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
