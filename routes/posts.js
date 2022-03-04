const router = require("express").Router();
const auth = require("../middleware/auth");
let Comment = require("../models/comment.model");
let Post = require("../models/post.model");

// get all post
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

router.route("/add-comment/:id").post(auth, (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const newContent = new Comment({
    content,
    likes: 0
  });
  Post.findByIdAndUpdate(
    { _id: id },
    { $push: { comments: newContent } },
    (err, data) => {
      if (err) res.status(400).json("error: " + err);
      else res.status(200).json(data);
    }
  );
});

// get post
router.route("/:id").get(auth, (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) res.status(400).json("error: " + err);
    else res.status(200).json(post);
  });
});

// get post comments
router.route("/comments/:id").get(auth, (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) res.status(400).json("error: " + err);
    else res.status(200).json(post.comments);
  });
});



// router.route("/comments/:id").get(auth, (req, res) => {
//     Post.findById(req.params.id, (err, post) => {
//       if (err) res.status(400).json("error: " + err);
//       else {
//         var comments = data.comments
        
//       }
//     });
//   });





module.exports = router;
