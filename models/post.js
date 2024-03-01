const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        user: {
          type: String,
          required: true,
          ref: "User",
        },
        text: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
