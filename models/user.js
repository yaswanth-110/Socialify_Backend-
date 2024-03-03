const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
    default: " ",
  },
  bio: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema);
