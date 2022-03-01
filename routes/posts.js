const router = require("express").Router();
let Post = require("../models/post.model");

router.route("/").get((req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => posts.json(posts))
    .catch((err) => res.status(400).json("error:" + err));
});

router.route("/add").post((req, res) => {
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
