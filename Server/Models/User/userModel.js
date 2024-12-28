import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// User schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required!"],
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
    avatar: {
      url: {
        type: String,
        required: [true, "Image URL is required!"],
      },
      publicId: {
        type: String,
        required: [true, "Image public ID is required!"],
      },
    },
    bio: {
      type: String,
      maxlength: [100, "Bio must not be more than 100 characters!"],
      minlength: [2, "Bio must not be more that 2 characters"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please enter a password!"],
      minlength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password!"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords do not match!",
      },
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    passwordResetAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpire: Date,
  },
  { timestamps: true }
);

//Encrypting password before saving it to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); //if password is not modified next()

  // Encrypting/hashing password before saving it
  this.password = await bcrypt.hash(this.password, 12); //first salts (adds a random string) password then hashes/encrypts it

  this.confirmPassword = undefined; //removes the field before saving user to database

  next();
});

/*
// Query middleware to return all active users
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } }); //this keyword points to current query
  next();
});
*/

// Compare passwords instance method
userSchema.methods.comparePasswordInDb = async function (password, passwordDb) {
  return await bcrypt.compare(password, passwordDb); //true or false
};

//
userSchema.methods.isPasswordReset = function (jwtTimestamp) {
  if (this.passwordResetAt) {
    // console.log(this.passwordResetAt, jwtTimestamp);
    const passwordResetTimesstamp = this.passwordResetAt.getTime() / 1000; //convert timestamp to seconds

    // console.log(passwordResetTimesstamp);
    return jwtTimestamp < passwordResetTimesstamp;
  }
  return false;
};

// Random token generator
userSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex"); //encrypting reset token and setting it

  this.passwordResetTokenExpire = Date.now() + 10 * 60000; //reset token expires in 10 mins

  // console.log(
  //   `Reset token: ${resetToken} encryptedResetToken: ${this.passwordResetToken}`
  // );

  return resetToken;
};

// User model
const User = mongoose.model("User", userSchema);

export default User;
