const mongoose = require('mongoose');
const User = require('./userModel'); // Import existing user model
const Order = require('./orderModel');

const sellerSchema = new mongoose.Schema({
  storeName: { type: String, required: true },
  storeLocation: { type: String, required: true },
  storeEmail: { 
    type: String,
    required: [true, 'Please provide your email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: [true, 'Email already exists'],
  },
  storePhoneNumber: { type: String, required: true },

  products: [{ type: mongoose.Schema.ObjectId, ref: 'Product' }],
});

sellerSchema.virtual('Product', {
  ref: 'Product',
  foreignField: 'sellerId',
  localField: 'id',
});

// Method to add a product to the seller's inventory
// sellerSchema.methods.addProduct = async function (productData) {
//   const product = new Product({
//     ...productData,
//     sellerId: this.id,
//   });
//   await product.save();
//   return product;
// };

sellerSchema.methods.calculateTotalSales = async function () {
  const sales = await Order.aggregate([
    { $match: { sellerId: this._id, status: 'delivered' } },
    { $group: { _id: null, totalSales: { $sum: '$totalAmount' } } },
  ]);

  return sales[0] ? sales[0].totalSales : 0;
};

sellerSchema.methods.calculateAverageRating = async function () {
  const result = await Product.aggregate([
    { $match: { sellerId: this._id } },
    { $group: { _id: null, averageRating: { $avg: '$ratingsAverage' } } },
  ]);

  return result[0] ? result[0].averageRating : 0;
};

// Compile the model from the schema
const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
