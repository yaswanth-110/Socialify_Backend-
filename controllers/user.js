const User = require("../models/user");
const Post = require("../models/post");
const Friend = require("../models/friend");

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

//UPDATE USER PROFILE

exports.updateuserProfile = (req, res, next) => {
  const userId = req.userId;
  let profileImage = req.body.image;
  const bio = req.body.bio;
  const username = req.body.username;
  let message;

  if (req.file) {
    profileImage = req.file.path;
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
        posts: posts.length != 0 ? posts : "No posts are available",
        userDetails: userDocument,
      });
    })
    .catch((err) => {
      next(err);
    });
};

//USER FOLLOWING AND FOLLOWERS

//

// exports.userFollowAndFollwer = (req, res, next) => {
//   const username = req.params.username;
//   console.log(username);
//   let userDocument;
//   const userId = req.userId;

//   User.findOne({ username: username })
//     .then((user) => {
//       if (!user) {
//         const error = new Error("No user is available with this username ");
//         error.statusCode = 400;
//         throw error;
//       }
//       userDocument = user;
//       return Friend.findOneAndUpdate(
//         { userId: user._id },
//         { $push: { followers: userId } },
//         { new: true }
//       );
//     })
//     .then((userDoc) => {
//       return Friend.findOneAndUpdate(
//         { userId: userId },
//         { $push: { follow: userDocument._id } },
//         { new: true }
//       );
//     })
//     .then((result) => {
//       res.status(200).json({ message: "Follow request sent successfully" });
//     })
//     .catch((err) => {
//       next(err);
//     });
// };

//USER FRIENDS

// exports.postFriends = (req, res, next) => {
//   const userId = req.userId;
//   User.findById(userId)
//     .then((user) => {
//       if (!user) {
//         const error = new Error("Not authenticated ");
//         error.statusCode = 400;
//         throw error;

//       }
//     })
//     .catch();
// };
