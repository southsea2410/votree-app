const express = require('express');
const sellerController = require('./../controllers/sellerController');

const router = express.Router();

router
  .route('/')
  .get(sellerController.getAllSellers)
  .post(sellerController.createSeller);

router
  .route('/:sellerId')
  .get(sellerController.getSeller)
  .patch(sellerController.updateSeller)
  .delete(sellerController.deleteSeller);

router
  .route('/:sellerId/products')
  .post(sellerController.addProduct)
  .get(sellerController.getAllSellerProducts);

router
  .route('/:sellerId/products/:productId')
  .delete(sellerController.deleteSellerProduct);

module.exports = router;
