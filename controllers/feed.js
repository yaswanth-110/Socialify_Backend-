const User = require("../models/user");
const Post = require("../models/post");
const Friend = require("../models/friend");

exports.getPosts = (req, re, next) => {
  const userId = req.userId;
  User.findById({ userId: User._id }).then().catch();
};
