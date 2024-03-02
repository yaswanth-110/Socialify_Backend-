const User = require("../models/user");
const Post = require("../models/post");
const Friend = require("../models/friend");
const mongoose = require("mongoose");

// exports.getPosts = (req, re, next) => {
//   const userId = req.userId;
//   User.findById({ userId: User._id }).then().catch();
// };

exports.uploadPost = (req, res, next) => {
  const imageUrl = req.body.image;
  const description = req.body.description;
  let creator;

  console.log(req.file);

  //   if (!req.file) {
  //     const error = new Error("No images provided");
  //     error.statusCode = 422;
  //     throw error;
  //   }
  const userId = req.body.userId;
  const post = new Post({
    imageUrl: imageUrl,
    description: description,
    creator: userId,
  });

  return post
    .save()
    .populate("creator")
    .exec()
    .then((post) => {
      return User.findById(post.creator);
    })
    .then((user) => {
      res.status(200).json({
        message: "post uploaded succesfully",
        post: post,
        creator: user,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updatePost = (req, res, next) => {
  const imageUrl = req.body.image;
  const description = req.body.description;
  const userId = req.userId;
};

// exports.deletePost = (req, res, next) => {};
