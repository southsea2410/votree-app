const orderController = require('../controllers/orderController');

const router = express.Router();

router
  .route('/')
  .post(orderController.createOrder)
  .get(orderController.getAllOrders);

router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(orderController.updateOrderForUser)
  .delete(orderController.deleteOrder);

router
  .route('/seller/:sellerId')
  .get(orderController.getOrdersForSeller)
  .patch(orderController.updateOrderForSeller);

module.exports = router;
