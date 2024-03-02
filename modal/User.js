import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilepath: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  friends: {
    type: [mongoose.Schema.Types.ObjectId], // Array of ObjectIds representing user IDs
    default: [], // Default value for empty friends list
  },
}, {
  timestamps: true,
});

export default mongoose.model("User", UserSchema);
/*  _id: userIds[0],
    firstName: "test",
    email: "aaaaaaa@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p11.jpeg",
    friends: [],
    location: "San Fran, CA",
    occupation: "Software Engineer",
    createdAt: 1115211422,
    updatedAt: 1115211422,
    */