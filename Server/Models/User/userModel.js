import mongoose from "mongoose";
import validator from "validator";

// User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is requred!"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email!"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Please enter a valid email!"],
  },
  avatar: String,
  password: {
    type: String,
    required: [true, "Please enter a password!"],
    minlength: 8,
    // select: false, // to prevent password from being returned in queries
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password!"],
    validate: {
      // This only works on CREATE and SAVE (not on UPDATE)
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match!",
    },
  },
});

// User model
const User = mongoose.model("User", userSchema);

export default User;
