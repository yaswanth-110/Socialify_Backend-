const User = require("../models/user");
const Post = require("../models/post");
const friends = require("../models/friends");
const friendRequest = require("../models/friendRequest");

exports.getPosts = (req, re, next) => {
  const userId = req.userId;
  User.findById({ userId: User._id }).then().catch();
};
