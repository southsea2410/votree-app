const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication.js');

const {
  getInfo,
  updateInfo,
  updateToSeller,
} = require('../controllers/updateInfo.js');

router.route('/').get(authenticateUser, getInfo);
router.route('/').patch(authenticateUser, updateInfo);
router.route('/updateToSeller').post(authenticateUser, updateToSeller);

module.exports = router;
