import User from "../../Models/User/userModel.js";
import asyncErrorHandler from "../../Utils/asyncErrorHandler.js";
import jwt from "jsonwebtoken";

// Create account
export const signup = asyncErrorHandler(async function (req, res, next) {
  // 1. Create the new user
  const { username, email, password, confirmPassword } = req.body;

  const user = await User.create(username, email, password, confirmPassword);

  // 2. Create a json web token
  const token = jwt.sign(
    { id: user._id, user: user.email },
    process.env.SECRET_STRING || "Secret string",
    {
      expiresIn: process.env.LOGIN_EXPIRES || "1d",
    }
  );

  res.status(201).json({
    status: "Success!",
    token, //Sending the token back to the client
    data: {
      user,
    },
  });
});
