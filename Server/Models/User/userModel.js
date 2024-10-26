import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

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
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords do not match!",
    },
  },
});

//Encrypting password before saving it to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); //if password is not modified next()

  // Encrypting/hashing password before saving it
  this.password = await bcrypt.hash(this.password, 12); //first salts (adds a random string) password then hashes/encrypts it

  this.confirmPassword = undefined; //removes the field before saving user to database

  next();
});

// User model
const User = mongoose.model("User", userSchema);

export default User;
