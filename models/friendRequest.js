const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const friendRequestSchema = new Schema({
  user: {
    type: String,
    required: true,
    ref: "User",
  },
  friend: {
    type: String,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("FriendRequest", friendRequestSchema);
