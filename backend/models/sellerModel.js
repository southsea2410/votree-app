const mongoose = require('mongoose');
const User = require('./userModel'); // Import existing user model

// Extend the user schema for seller-specific attributes
const sellerSchema = User.schema.clone();

sellerSchema.add({
  storeName: { type: String, required: true },
  storeLocation: { type: String, required: true },
  storeEmail: { type: String, required: true },
  storePhoneNumber: { type: String, required: true },
});

// Virtual for seller's products
sellerSchema.virtual('products', {
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

// // Method to calculate total sales of the seller
// sellerSchema.methods.calculateTotalSales = async function () {
//   const sales = await Product.aggregate([
//     { $match: { sellerId: this.id } },
//     { $group: { _id: null, totalSales: { $sum: '$price' } } },
//   ]);

//   return sales[0] ? sales[0].totalSales : 0;
// };

// // Method to get average rating of the seller (Assuming you have a rating field in your product model)
// sellerSchema.methods.calculateAverageRating = async function () {
//   const result = await Product.aggregate([
//     { $match: { sellerId: this.id } },
//     { $group: { id: null, averageRating: { $avg: '$rating' } } },
//   ]);

//   return result[0] ? result[0].averageRating : 0;
// };

// Compile the model from the schema
const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
