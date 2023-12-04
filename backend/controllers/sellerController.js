const Seller = require('../models/sellerModel');
const Product = require('../models/productModel');

exports.createSeller = async (req, res, next) => {
  try {
    const seller = await Seller.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        seller,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// Adding a product to a seller
exports.addProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    const seller = await Seller.findById(req.params.sellerId);
    seller.products.push(product.id);
    await seller.save();
    res.status(201).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// Get all products of a seller
exports.getAllSellerProducts = async (req, res, next) => {
  try {
    const seller = await Seller.findById(req.params.sellerId);
    const products = await Product.find({ sellerId: seller._id });

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteSellerProduct = async (req, res, next) => {
  try {
    const seller = await Seller.findById(req.params.sellerId);
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res.status(404).send();
    }
    seller.products.pull(product.id);
    await seller.save();
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all sellers
exports.getAllSellers = async (req, res, next) => {
  try {
    const sellers = await Seller.find();
    res.status(200).json({
      status: 'success',
      results: sellers.length,
      data: {
        sellers,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// Get a seller
exports.getSeller = async (req, res, next) => {
  try {
    const seller = await Seller.findById(req.params.sellerId);
    res.status(200).json({
      status: 'success',
      data: {
        seller,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// Update a seller
exports.updateSeller = async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'storeName',
    'storeLocation',
    'storeEmail',
    'storePhoneNumber',
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const seller = await Seller.findById(req.params.sellerId);
    if (!seller) {
      return res.status(404).send();
    }

    updates.forEach((update) => (seller[update] = req.body[update]));
    await seller.save();
    res.send(seller);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteSeller = async (req, res) => {
  try {
    const seller = await Seller.findByIdAndDelete(req.params.id);
    if (!seller) {
      return res.status(404).send();
    }
    res.send(seller);
  } catch (error) {
    res.status(500).send(error);
  }
};
