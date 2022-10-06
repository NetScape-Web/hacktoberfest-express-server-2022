import mongoose from "mongoose";

// Defining Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  admin: { type: Boolean, default: false },
});

// Model
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
