const router = require("express").Router();
const auth = require("../middleware/auth");
let Comment = require("../models/comment.model");
let Post = require("../models/post.model");

router.get("/", auth, async (req, res) => {
  try {
    Post.find()
      .sort({ date: -1 })
      .then((posts) => res.json(posts))
      .catch((err) => res.status(400).json("error: " + err));
  } catch (error) {
    console.log(err);
  }
});

router.route("/add").post(auth, (req, res) => {
  const { caption, image } = req.body;
  const newPost = new Post({
    caption,
    image
  });
  newPost
    .save()
    .then(() => res.json("Post Added"))
    .catch((err) => res.status(400).json(err));
});

router.route("/add-comment/:id").post(auth,(req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const post = Post.findById(id);
  console.log(post)
  const newContent = new Comment({
    content,
    likes: 0
  });
  post.comments.push(newContent);
  newContent.save().then(() => res.json("Comment Added"));
});

module.exports = router;
