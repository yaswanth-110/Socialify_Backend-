const User = require("../models/user");
const Post = require("../models/post");
const Friend = require("../models/friend");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { log } = require("console");

//GET FOLLWERS POSTS

exports.getPosts = (req, res, next) => {
  const userId = req.userId;
  Post.find()
    .then((posts) => {
      console.log(posts);
      if (posts.length === 0) {
        const error = new Error("No posts are available");
        error.statusCode = 400;
        throw error;
      }
      res
        .status(200)
        .json({ message: "posts retrieved successfully", posts: posts });
    })
    .catch((err) => {
      //   console.log(err);
      next(err);
    });
};

//UPLOAD A POST

exports.uploadPost = (req, res, next) => {
  const description = req.body.description;

  // console.log(req.file);

  if (!req.file) {
    const error = new Error("No images provided");
    error.statusCode = 422;
    throw error;
  }

  const imageUrl = req.file.path;

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

//UPDATE A POST

exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const description = req.body.description;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error("No image is picked");
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

// GET EDIT POST

exports.getEditPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .populate("creator")
    .then((post) => {
      if (!post) {
        const error = new Error("Post is not available");
        error.statusCode = 402;
        throw error;
      }

      res
        .status(200)
        .json({ message: "post retrieved successfully", post: post });
    })
    .catch((err) => next(err));
};

//DELETE A POST

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findOneAndDelete(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post");
        error.statusCode = 422;
        throw error;
      }
      console.log(post);
      if (post.creator.toString() !== req.userId) {
        const error = new Error("Not authorized");
        error.statusCode = 403;
        throw error;
      }

      clearImage(post.imageUrl);
    })
    .then((result) => {
      res.status(200).json({ message: "Deleted post" });
    })
    .catch((err) => {
      next(err);
    });
};

// LIKED A POST

exports.likedPost = (req, res, next) => {
  const postId = req.params.postId;
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const error = new Error("Not authenticated");
        error.statusCode = 401;
        throw error;
      }
      return Post.findById(postId);
    })
    .then((post) => {
      if (!post) {
        const error = new Error("Post is not available");
        error.statusCode = 400;
        throw error;
      }

      if (post.likes.includes(req.userId)) {
        const filterLikes = post.likes.filter(
          (p) => p.toString() !== req.userId
        );
        console.log(filterLikes);
        post.likes = filterLikes;
      } else {
        post.likes.push(req.userId);
      }
      return post.save();
    })
    .then((result) => {
      return Post.findById(postId).populate("likes");
    })
    .then((updatedPost) => {
      res.status(200).json({ message: "Liked post", post: updatedPost });
    })
    .catch((err) => {
      next(err);
    });
};

//COMMENT ON A POST

exports.commentPost = (req, res, next) => {
  const postId = req.params.postId;

  const comment = req.body.comment;
  const commentObject = {
    user: req.userId,
    text: comment,
  };
  let userDetails;
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const error = new Error("Not authenticated");
        error.statusCode = 401;
        throw error;
      }

      return Post.findById(postId);
    })
    .then((post) => {
      if (!post) {
        const error = new Error("Post is not available");
        error.statusCode = 400;
        throw error;
      }
      post.comments.push(commentObject);
      return post.save();
    })
    .then((result) => {
      return Post.findById(postId).populate("comments.user");
    })
    .then((updatedPost) => {
      res.status(200).json({
        message: "commented on Post",
        post: updatedPost,
        userDetails: userDetails,
      });
    })
    .catch((err) => {
      next(err);
    });
};

// CLEAR A IMAGE FROM IMAGES DIRECTORY

const clearImage = (filepath) => {
  console.log(__dirname);
  filepath = path.join(__dirname, "..", filepath);
  fs.unlink(filepath, (err) => {
    console.log(err);
  });
};
