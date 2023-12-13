const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const Token = require("../models/Authentication/Token");
const crypto = require("crypto");
const {
  createTokenUser,
  attachCookiesToResponse,
} = require('../utils');

const getUserInfo = async (req, res) => {
  const {
    user: { userId },
  } = req;

  try {
    const infoUser = await User.findOne({
      _id: userId,
    }).select('fullName dateOfBirth email phone');

    if (!infoUser) {
      throw new NotFoundError(`No user with id ${userId}`);
    }

    res.status(StatusCodes.OK).json({ infoUser });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const updateUserInfo = async (req, res) => {
  const {
    body: { role },
    user: { userId },
  } = req;

  const currentRole = User.findOne({ _id: userId }).select('role');

  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { role },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      throw new NotFoundError(`No user with id ${userId}`);
    }

    const tokenUser = createTokenUser(updatedUser);
    if (currentRole !== updatedUser.role) {
      refreshToken = crypto.randomBytes(40).toString('hex');
      attachCookiesToResponse({ res, user: tokenUser, refreshToken });
      // update Token in database
      await Token.findOneAndUpdate(
        { user: userId },
        { refreshToken },
        { new: true, runValidators: true },
      );
    }
    res.status(StatusCodes.OK).json({ user: tokenUser });

  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }
};

module.exports = {
  getUserInfo,
  updateUserInfo,
};
