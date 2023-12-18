const User = require('../models/userModel');
const Seller = require('../models/sellerModel');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const Token = require('../models/Authentication/Token');
const crypto = require('crypto');
const { createTokenUser, attachCookiesToResponse } = require('../utils');

const getUserInfo = async (req, res) => {
  console.log('getUserInfo');
  const {
    user: { userId, role },
  } = req;

  try {
    let userInfo;

    if (role === 'user') {
      userInfo = await User.findOne({ _id: userId }).select(
        'role fullName dateOfBirth gender phoneNumber email address interest,',
      );
    } else if (role === 'seller') {
      userInfo = await User.findOne({ _id: userId })
        .populate(
          'sellerDetails',
          'storeName storeLocation storeEmail storePhoneNumber',
        )
        .select(
          'role fullName dateOfBirth gender phoneNumber email address interest',
        );
    }

    if (!userInfo) {
      throw new NotFoundError(`No user with id ${userId}`);
    }

    res.status(StatusCodes.OK).json({ userInfo });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getUserInfoById = async (req, res) => {
  try {
    userInfo = await User.findOne({ _id: req.params.id }).select(
      'role fullName dateOfBirth gender phoneNumber email address interest sellerDetails',
    );
    if (!userInfo) {
      throw new NotFoundError(`No user with id ${req.params.id}`);
    }

    if (userInfo.role === 'seller') {
      userInfo.sellerDetails = await Seller.findOne({
        _id: userInfo.sellerDetails,
      }).select('storeName storeLocation storeEmail storePhoneNumber');
    }
    res.status(StatusCodes.OK).json({ userInfo });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const updateUserInfo = async (req, res) => {
  const {
    body: {
      fullName,
      dateOfBirth,
      gender,
      phoneNumber,
      email,
      address,
      interest,
      storeName,
      storeLocation,
      storeEmail,
      storePhoneNumber,
    },
    user: { userId, role },
  } = req;

  try {
    let updatedUser;

    if (role === 'user') {
      updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true,
      });
    } else if (role === 'seller') {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          fullName,
          dateOfBirth,
          gender,
          phoneNumber,
          email,
          address,
          interest,
        },
        { new: true, runValidators: true },
      );

      await Seller.findOneAndUpdate(
        { _id: updatedUser.sellerDetails },
        { storeName, storeLocation, storeEmail, storePhoneNumber },
        { new: true, runValidators: true },
      );
    }

    if (!updatedUser) {
      // User not found
      throw new NotFoundError(`No user with id ${userId}`);
    }

    res.status(StatusCodes.OK).json({ user: updatedUser });
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

const updateToSeller = async (req, res) => {
  const {
    body: { storeName, storeLocation, storeEmail, storePhoneNumber },
    user: { userId },
  } = req;

  try {
    const currentUser = await User.findOne({ _id: userId, role: 'user' });

    if (!currentUser) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: 'User not found or is not eligible for role update.',
      });
    }

    const seller = new Seller({
      storeName,
      storeLocation,
      storeEmail,
      storePhoneNumber,
    });

    (seller._id = currentUser._id), await seller.save();

    await User.findByIdAndUpdate(userId, {
      role: 'seller',
      sellerDetails: seller._id,
    });

    const updatedUser = await User.findById(userId).populate('sellerDetails');

    const tokenUser = createTokenUser(updatedUser);
    if (updatedUser.role !== currentUser.role) {
      refreshToken = crypto.randomBytes(40).toString('hex');
      attachCookiesToResponse({ res, user: tokenUser, refreshToken });
      await Token.findOneAndUpdate(
        { user: userId },
        { refreshToken },
        { new: true, runValidators: true },
      );
    }

    res.status(StatusCodes.OK).json({ user: updatedUser });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  getUserInfo,
  getUserInfoById,
  updateUserInfo,
  updateToSeller,
};
