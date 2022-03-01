const mongoose = require("mongoose");
const Comment = require("./comment.model");
const Schema = mongoose.Schema;
const Co
const postSchema = new Schema({
  caption: {
    body: String,
    trim: true,
    date: Date
  },
  image: {
    type: String
  },
  likes: {
    type: Number
  },
  comments: {
    type: [Comment]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
