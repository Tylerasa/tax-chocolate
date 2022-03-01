const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  caption: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  likes: {
    type: Number
  },
  comments: {
    type: Comment
  }
});



const Post = mongoose.model("Movie", postSchema);
module.exports = Post;
