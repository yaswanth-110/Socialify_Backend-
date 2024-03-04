const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const friendSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    friendRequestSent: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    friendRequestRecieved: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Friend", friendSchema);
