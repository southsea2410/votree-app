const Seller = require('../models/sellerModel');
const Product = require('../models/productModel');
const productController = require('../controllers/productController');

// exports.createSeller = async (req, res, next) => {
//   try {
//     const seller = await Seller.create(req.body);
//     res.status(201).json({
//       status: 'success',
//       data: {
//         seller,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

// Adding a product to a seller

exports.addProduct = async (req, res) => {
  // req.sellerId = req.params.sellerId; // Or determine the sellerId based on the logged-in user or other criteria
  req.sellerId = req.user.userId;
  productController.createProduct(req, res);
};

// Get all products of a seller
exports.getAllSellerProducts = async (req, res, next) => {
  try {
    const sellerId = req.user.userId;

    const products = await Product.find({ sellerId: sellerId });

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
    const sellerId = req.user.userId;
    const seller = await Seller.findById(sellerId);

    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'No product found with that ID',
      });
    }

    seller.products.pull(req.params.productId);
    await seller.save();

    res.status(204).json({
      status: 'success',
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: `Failed to delete: ${error.message}`,
    });
  }
};

// Get all sellers
// exports.getAllSellers = async (req, res, next) => {
//   try {
//     const sellers = await Seller.find();
//     res.status(200).json({
//       status: 'success',
//       results: sellers.length,
//       data: {
//         sellers,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

// Get a seller
exports.getSeller = async (req, res, next) => {
  try {
    const seller = await Seller.findById(req.user.userId);
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
// exports.updateSeller = async (req, res, next) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = [
//     'storeName',
//     'storeLocation',
//     'storeEmail',
//     'storePhoneNumber',
//     'products',
//   ];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update),
//   );
//   if (!isValidOperation) {
//     return res.status(400).send({ error: 'Invalid updates!' });
//   }
//   try {
//     const seller = await Seller.findById(req.user.userId);
//     if (!seller) {
//       return res.status(404).send();
//     }

//     updates.forEach((update) => (seller[update] = req.body[update]));
//     await seller.save();
//     res.send(seller);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

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
