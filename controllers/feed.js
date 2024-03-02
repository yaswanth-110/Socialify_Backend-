const User = require("../models/user");
const Post = require("../models/post");
const Friend = require("../models/friend");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { ResultWithContextImpl } = require("express-validator/src/chain");

exports.getPosts = (req, re, next) => {
  const userId = req.userId;
  Post.findById({ creator: userId })
    .populate("creator")
    .then((posts) => {
      if (!posts) {
        const error = new Error("No posts are available");
        error.statusCode = 400;
        throw error;
      }
      res
        .status(400)
        .json({ message: "posts retrieved successfully", posts: posts });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.uploadPost = (req, res, next) => {
  const imageUrl = req.file.path;
  const description = req.body.description;
  let creator;

  console.log(req.file);

  //   if (!req.file) {
  //     const error = new Error("No images provided");
  //     error.statusCode = 422;
  //     throw error;
  //   }
  const userId = req.userId;
  const post = new Post({
    imageUrl: imageUrl,
    description: description,
    creator: userId,
  });

  return post
    .save()
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
  const postId = req.params.postId;
  const description = req.body.description;
  let imageUrl = req.body.image;
  const userId = req.userId;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!req.file) {
    const error = new Error("No image is found");
    error.statusCode = 422;
    throw error;
  }
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post");
        error.statusCode = 422;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error("Not authorized");
        error.statusCode = 403;
        throw error;
      }
      if (imageUrl != post.imageUrl) {
        clearImage(post.imageUrl);
      }
      post.description = description;
      post.imageUrl = imageUrl;
      return post.save();
    })
    .then((result) => {
      res
        .status(200)
        .json({ message: "post updated succesfully", post: result });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post");
        error.statusCode = 422;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error("Not authorized");
        error.statusCode = 403;
        throw error;
      }
      clearImage(post.imageUrl);
      return post.findAndRemove(postId);
    })
    .then((result) => {
      res.status(200).json({ message: "Deleted post" });
    })
    .catch((err) => {
      next(err);
    });
};

const clearImage = (filepath) => {
  filepath = path.join(__dirname, "..", filepath);
  fs.unlink(filepath, (err) => {
    console.log(err);
  });
};
