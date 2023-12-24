const express = require('express');
const sellerController = require('./../controllers/sellerController');
const productController = require('./../controllers/productController');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const router = express.Router();

router.use(authenticateUser);

router.use(authorizePermissions('seller'));

// router
//   .route('/')
// .get(sellerController.getAllSellers)
// .post(sellerController.createSeller);

router
  .route('/')
  .get(sellerController.getSeller)
  .delete(sellerController.deleteSeller);

router
  .route('/products')
  .post(sellerController.addProduct)
  .get(sellerController.getAllSellerProducts);  // Here someId is null
  
  router
  .route('/products/:someId') // productId or sellerId
  .delete(sellerController.deleteSellerProduct) // productID
  .patch(productController.updateProduct) // productID
  .get(sellerController.getAllSellerProducts);  // Here someId is sellerId

module.exports = router;
