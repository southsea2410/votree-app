const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'A comment must have an id'],
      unique: true,
    },
    // User Id reference to user model
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A comment must belongs to a user'],
    },
    // Post Id reference to post model
    postId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, 'A comment must belongs to a post'],
    },
    content: {
      type: String,
      required: [true, 'A comment must have a content'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    upVoteCount: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
