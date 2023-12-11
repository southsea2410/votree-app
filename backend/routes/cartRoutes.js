const cartController = require('../controllers/cartController');
const express = require('express');
const router = express.Router();

router
  .route('/')
  .get(cartController.getAllCarts)
  .post(cartController.createCart);

router
  .route('/:cartId')
  .get(cartController.getCart)
  .patch(cartController.updateCart)
  .delete(cartController.deleteCart);

router
  .route('/:cartId/products')
  .post(cartController.addProduct)
  .get(cartController.getCartProducts);

router
  .route('/:cartId/products/:productId')
  .delete(cartController.deleteCartProduct);

module.exports = router;
