const express = require('express');
const sellerController = require('./../controllers/sellerController');
const Product = require('./models/productModel');

const router = express.Router();

router.route('/seller').post(sellerController.createSeller);

router
  .route('/seller/:id')
  .get(sellerController.getSeller)
  .patch(sellerController.updateSeller)
  .delete(sellerController.deleteSeller);

module.exports = router;
