import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  fullname: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  hometown: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
