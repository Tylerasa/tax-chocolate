const router = require("express").Router();
const bcrypt = require("bcryptjs");
let User = require("../models/user.model");

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
          newUser.save((err) => {
            if (err) {
              res.send(err);
            } else {
              res.send({ message: "Successfull" });
            }
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
  User.findOne({ username }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid Credentials" });
        (user) => {
          res.json({
            user: {
              username,
              email
            }
          });
        };
        res.json({ user: user });
      });
    }
  });
});

module.exports = router;
