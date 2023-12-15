const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

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
    body: { fullName, dateOfBirth, email, phone },
    user: { userId },
  } = req;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { fullName, dateOfBirth, email, phone },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      throw new NotFoundError(`No user with id ${userId}`);
    }

    res.status(StatusCodes.OK).json({ updatedUser });
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
