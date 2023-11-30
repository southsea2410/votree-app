const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'A post must have an id'],
    unique: true,
  },
  title: {
    type: String,
    required: [true, 'A post must have a title'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'A post must have a content'],
    trim: true,
  },
  authorId: {
    type: String,
    required: [true, 'A post must have an author'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  lastModifiedAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  voteCount: {
    type: Number,
    default: 0,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  commentList: {
    type: Array,
    default: [],
  },
  topicId: {
    type: String,
    required: [true, 'A post must have a topic'],
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
