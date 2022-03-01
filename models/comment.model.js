const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: Schema,
    required: true,
    trim: true
  },
  likes: {
    type: Number
  }
});

const Comment = mongoose.model("Movie", commentSchema);
module.exports = Comment;