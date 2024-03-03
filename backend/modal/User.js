import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  username: {
    type: String,
    unique:true,
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
    minlength: 6,
  },
  friends: {
    type: [mongoose.Schema.Types.ObjectId], // Array of ObjectIds representing user IDs
    default: [], // Default value for empty friends list
  },
}, {
  timestamps: true,
});

export default mongoose.model("User", UserSchema);