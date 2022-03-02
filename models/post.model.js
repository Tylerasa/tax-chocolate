const mongoose = require("mongoose");
const Comment = require("./comment.model");
const Schema = mongoose.Schema;
const postSchema = new Schema({
  caption: {
    body: String,
    date: Date
  },
  image: {
    type: String
  },
  likes: {
    type: Number
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  date: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
