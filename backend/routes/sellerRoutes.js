const express = require('express');
const sellerController = require('./../controllers/sellerController');

const router = express.Router();

router.route('/').post(sellerController.createSeller);

router
  .route('/:sellerId/products')
  .post(sellerController.addProduct)
  .get(sellerController.getSellerProducts);

router
  .route('/:sellerId/products/:productId')
  .patch(sellerController.updateSellerProduct)
  .delete(sellerController.deleteSellerProduct);

module.exports = router;
