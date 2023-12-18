const orderController = require('../controllers/orderController.js');
const express = require('express');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');
const router = express.Router();

router.use(authenticateUser);

router.get('/checkout-session/:cartId', orderController.getCheckoutSession);

router
  .route('/')
  .post(orderController.createOrder)
  .get(orderController.getAllOrders);

router
  .route('/:id')
  .get(orderController.getOrder)
  // .patch(orderController.updateOrderForUser)
  .delete(orderController.deleteOrder);

router.use(authorizePermissions('seller'));

router.route('/seller/:sellerId');
// .get(orderController.getOrdersForSeller)
// .patch(orderController.updateOrderForSeller);

module.exports = router;
