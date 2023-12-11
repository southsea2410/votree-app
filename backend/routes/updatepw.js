const express = require("express");
const router = express.Router();
const { updatePassword } = require("../controllers/updatepw");
const {
    authenticateUser,
} = require('../middleware/authentication.js');
  

router.route("/").patch(authenticateUser, updatePassword);

module.exports = router;