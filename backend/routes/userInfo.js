const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication.js');

const {
  getUserInfo,
  getUserInfoById,
  updateUserInfo,
  updateToSeller,
} = require('../controllers/userInfo.js');

router.route('/').get(authenticateUser, getUserInfo);
router.route('/:id').get(authenticateUser, getUserInfoById);
router.route('/').patch(authenticateUser, updateUserInfo);
router.route('/updateToSeller').post(authenticateUser, updateToSeller);

module.exports = router;
