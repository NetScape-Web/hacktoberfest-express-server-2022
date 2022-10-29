import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

// Defining Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "A user must have an email address"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    trim: true,
  },
  cpassword: {
    type: String,
    trim: true,
    required: [true, "Please provide a cpassword field"],
    validate: {
      // custom validator to check if
      //password and confirmpassword match
      // This only works on CREATE and SAVE!!! not find()
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  phone: {
    type: String,
    required: [true, "A user must have a phone number"],
    trim: true,
  },
  admin: { type: Boolean, default: false },
});

// function to prevent saving the cpassword field to database
userSchema.pre("save", async function (next) {
  // Only run this function if password was actually provided/modified
  if (!this.isModified("password")) return next();

  //password hashing just before save() or create() is called
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(this.password, salt);
  this.password = hashPassword;

  // Delete cpassword field
  this.cpassword = undefined;
  next();
});

// Model
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
