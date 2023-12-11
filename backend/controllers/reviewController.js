const reviewModel = require('../models/reviewModel');

const factory = require('./handlerFactory');

exports.createReview = factory.createOne(reviewModel);
exports.getAllReviews = factory.getAll(reviewModel);
exports.getReview = factory.getOne(reviewModel);
exports.updateReview = factory.updateOne(reviewModel);
exports.deleteReview = factory.deleteOne(reviewModel);

