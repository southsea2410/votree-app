const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'An user must have a username'],
      unique: true,
    },

    avatar: {
      type: String,
    },

    fullName: {
      type: String,
      required: [true, 'An user must have a name'],
    },

    dateOfBirth: {
      type: String,
      validate: {
        validator: function (value) {
          return moment(value, 'DD/MM/YYYY', true).isValid();
        },
        message: 'Invalid date format. Please use DD/MM/YYYY.',
      },
    },

    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },

    phoneNumber: {
      type: String,
    },

    email: {
      type: String,
      required: [true, 'Please provide your email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique: [true, 'Email already exists'],
    },

    address: {
      type: String,
      maxLength: [500, 'The max length of address is 500 characters'],
    },

    interest: {
      type: String,
      maxLength: [500, 'The max length of interest is 500 characters'],
    },

    role: {
      type: String,
      enum: ['user', 'seller'],
      default: 'user',
    },

    password: {
      type: String,
      required: [true, 'Please provide password'],
      minLength: [6, 'Password must be at least 6 characters long'],
    },

    active: {
      type: Boolean,
      default: true,
      select: false,
    },

    sellerDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller',
    },
  },
  { timestamps: true },
);

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, username: this.username },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    },
  );
};

userSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
