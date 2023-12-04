const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'A product must have an id'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'A product must have a type'],
      // enum: ['food', 'drink'],
    },
    suitEnvironment: {
      type: String,
      required: [true, 'A product must have a suit environment'],
      // enum: ['indoor', 'outdoor'],
    },
    suitClimate: {
      type: String,
      required: [true, 'A product must have a suit climate'],
      // enum: ['hot', 'cold'],
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    quantity: {
      type: Number,
      required: [true, 'A product must have a quantity'],
    },
    description: {
      type: String,
      required: [true, 'A product must have a description'],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    image: {
      type: String,
      required: [true, 'A product must have an image'],
    },
    video: {
      type: String,
      required: [true, 'A product must have a video'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    // sellerId: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'User',
    //   required: [true, 'A product must belong to a seller'],
    // },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Product = mongoose.model('products', productSchema);

module.exports = Product;
