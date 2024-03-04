const User = require("../models/user");
const Post = require("../models/post");
const Friend = require("../models/friend");

// const { ObjectId } = require("mongoose").Types;

const mongoose = require("mongoose");

const isAuth = require("../middleware/is-auth");

//GET USER PROFILE
exports.getuserProfile = (req, res, next) => {
  const userId = req.userId;
  let userDocument;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("User is not authenticated");
        error.statusCode = 401;
        throw error;
      }
      userDocument = user;
      return Post.find({ creator: userId }).then((posts) => {
        res.status(200).json({
          posts: posts.length !== 0 ? posts : "No posts are available",
          userDetails: userDocument,
        });
      });
    })
    .catch((err) => {
      next(err);
    });
};

//GET SEARCH USER PROFILE

exports.getSearchUser = (req, res, next) => {
  const userparam = req.params.userparam;
  console.log(userparam);

  User.find({ username: { $regex: `${userparam}`, $options: "i" } })
    .select("username")
    .then((users) => {
      if (!users) {
        const error = new Error("No users with this name  ");
        error.statusCode = 401;
        throw error;
      }
      res.status(200).json(users);
    })
    .catch((err) => {
      next(err);
    });
};

//UPDATE USER PROFILE

exports.updateuserProfile = (req, res, next) => {
  const userId = req.userId;
  let profileImage = req.body.image;
  const bio = req.body.bio;
  const username = req.body.username;
  let message;

  if (req.file) {
    profileImage = req.file.path.replace("\\", "/");
  }
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("Not authenticated");
        error.statusCode = 401;
        throw error;
      }
      user.profileImageUrl = profileImage;
      user.bio = bio;
      user.username = username;
      return user.save();
    })
    .then((user) => {
      res.status(200).json({
        message: "user profile updated succesfully",
        userDetails: user,
      });
    })
    .catch((err) => next(err));
};

//GET FRIENDS USER PROFILE

exports.getUser = (req, res, next) => {
  const username = req.params.username;
  console.log(username);
  let userDocument;
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        const error = new Error("No user is available with this username ");
        error.statusCode = 400;
        throw error;
      }
      userDocument = user;
      return Post.find({ creator: user._id });
    })
    .then((posts) => {
      res.status(200).json({
        posts: posts.length !== 0 ? posts : "No posts are available",
        userDetails: userDocument,
      });
    })
    .catch((err) => {
      next(err);
    });
};

//USER FRIEND REQUEST SENT AND RECIEVED

exports.userFriendReqSent = (req, res, next) => {
  const username = req.params.username;
  console.log(username);
  let userDocument;
  const userId = req.userId;

  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        const error = new Error("No user is available with this username ");
        error.statusCode = 400;
        throw error;
      }
      userDocument = user;
      return Friend.findOneAndUpdate(
        { userId: user._id },
        { $addToSet: { friendRequestRecieved: userId } },
        { upsert: true }
      );
    })
    .then((result) => {
      return Friend.findOneAndUpdate(
        { userId: userId },
        { $addToSet: { friendRequestSent: userDocument._id } },
        { upsert: true }
      );
    })
    .then((result) => {
      res.status(200).json({ message: "Friend request sent successfully" });
    })
    .catch((err) => {
      next(err);
    });
};

//USER FRIEND ACCEPT

exports.userFriendReqAccept = (req, res, next) => {
  const username = req.params.username;
  console.log(username);
  // const userId = req.userId;
  let userDetails;
  console.log(typeof req.userId);
  console.log(typeof mongoose.Types.ObjectId.createFromHexString(req.userId));
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        const error = new Error("No account with this username ");
        error.statusCode = 400;
        throw error;
      }
      userDetails = user;
      console.log(typeof userDetails._id);

      return Friend.findOneAndUpdate(
        { userId: req.userId },
        {
          $addToSet: { friends: userDetails._id },
          $pull: { friendRequestSent: userDetails._id },
        }
      );
    })
    .then((result) => {
      return Friend.findOneAndUpdate(
        { userId: userDetails._id },
        {
          $addToSet: { friends: req.uerId },
          $pull: {
            friendRequestRecieved: mongoose.Types.ObjectId.createFromHexString(
              req.userId
            ),
          },
        }
      );
    })
    .then((result) => {
      res.status(200).json({ message: `${username} accepted your request` });
    })
    .catch((err) => {
      next(err);
    });
};

exports.userFriendReqReject = (req, res, next) => {
  const username = req.params.username;
  const userId = req.userId;
  console.log(username);
  let userDetails;
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        const error = new Error("No account with this username ");
        error.statusCode = 400;
        throw error;
      }
      userDetails = user;
      return Friend.findByIdAndUpdate(userId, {
        $pull: { friendRequestSent: userDetails._id },
      });
    })
    .then((result) => {
      console.log("hi");
      return Friend.findByIdAndUpdate(userDetails._id, {
        $pull: {
          friendRequestRecieved: mongoose.Types.ObjectId.createFromHexString(
            req.userId
          ),
        },
      });
    })
    .then((result) => {
      res.status(200).json({ message: `${username} rejected your request` });
    })
    .catch((err) => {
      next(err);
    });
};
