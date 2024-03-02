const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const friendSchema = new Schema(
  {
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
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Friend", friendSchema);
