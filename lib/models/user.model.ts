import mongoose from "mongoose";

const UserAccountSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  fullname: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  hometown: { type: String, required: true },
});

const UserAccount = mongoose.models.UserAccount||mongoose.model("UserAccount", UserAccountSchema);

export default UserAccount;
