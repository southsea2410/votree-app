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
  .get(sellerController.getAllSellerProducts);

router
  .route('/products/:productId')
  .delete(sellerController.deleteSellerProduct)
  .patch(productController.updateProduct)
  .get(productController.getProduct);

module.exports = router;
