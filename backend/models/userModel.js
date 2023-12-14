const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'An user must have an id'],
    unique: true,
  },
  fullName: {
    type: String,
    required: [true, 'An user must have a name'],
  },
  userName: {
    type: String,
    required: [true, 'An user must have a username'],
    unique: true,
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
  role: {
    type: String,
    enum: ['user', 'seller'],
    default: 'user',
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: [true, 'Email already exists'],
  },
  phoneNumber: {
    type: String,
  },
  avatar: {
    type: String,
    // required: [true, 'An user must have an avatar'],
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
});

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
