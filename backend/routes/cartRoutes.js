const cartController = require('../controllers/cartController');
const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

// router.use(authenticateUser);

router
  .route('/')
  .get(cartController.getAllCarts)
  .post(authenticateUser, authorizePermissions('user'), cartController.createCart);

router
  .route('/:cartId')
  .get(cartController.getCart)
  .patch(authenticateUser, cartController.updateCart)
  .delete(cartController.deleteCart);

router
  .route('/:cartId/products')
  // .post(cartController.addProduct)
  .get(cartController.getCartProducts);

router
  .route('/:cartId/products/:productId')
  .delete(cartController.deleteCartProduct);

module.exports = router;
