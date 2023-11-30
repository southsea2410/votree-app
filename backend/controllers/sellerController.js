const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

exports.getAllSellers = factory.getAll('Seller');
exports.getSeller = factory.getOne('Seller');
exports.createSeller = factory.createOne('Seller');
exports.updateSeller = factory.updateOne('Seller');
exports.deleteSeller = factory.deleteOne('Seller');

