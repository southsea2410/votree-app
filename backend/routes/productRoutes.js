const express = require('express');
const productController = require('./../controllers/productController');
const router = express.Router({ mergeParams: true });


router
  .route('/')
  .get(productController.getAllProduct)
  // .post(
  //   authenticateUser,
  //   authorizePermissions('seller'),
  //   productController.createProduct,
  // );

router
  .route('/:id')
  .get(productController.getProduct)
  // .patch(
  //   authenticateUser,
  //   authorizePermissions('seller'),
  //   productController.updateProduct,
  // )
  // .delete(
  //   authenticateUser,
  //   authorizePermissions('selller'),
  //   productController.deleteProduct,
  // );

module.exports = router;
