const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let User = require("../models/user.model");

function generateAccessToken(id, username) {
  return jwt.sign({ id, username }, process.env.TOKEN_SECRET, {
    expiresIn: "3600s"
  });
}

router.route("/").get((req, res) => {
  User.find()
    .sort({ date: -1 })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("error:" + err));
});

router.route("/register").post((req, res) => {
  const { username, email, password } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ msg: "Please Fill All Fields" });
  }

  const newUser = new User({ username, email, password });
  User.findOne({ username: username }, (err, user) => {
    if (user) {
      res.send({ message: "User Already Exist" });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            const token = generateAccessToken(user.id, user.username);
            res.json({
              token,
              user
            });
          });
        });
      });
    }
  });
});

router.route("/login").post((req, res) => {
  const { username, password } = req.body;

  if (!password || !username) {
    return res.status(400).json({ msg: "Please Fill All Fields" });
  }
  User.findOne({ username: username.toLowerCase() }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid Credentials" });

        const token = generateAccessToken(user.id, user.username);

        res.json({
          token,
          user
        });
      });
    }
  });
});

module.exports = router;

// var base64Url = token.split(".")[1];
// var base64 = base64Url.replace("-", "+").replace("_", "/");
// console.log(Buffer.from(base64, "base64").toString());
