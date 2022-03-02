const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  likes: {
    type: Number
  }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
