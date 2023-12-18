const userController = require('../controllers/userController');
const express = require('express');

const router = express.Router();

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
