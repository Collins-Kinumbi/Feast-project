import User from "../../Models/User/userModel.js";
import asyncErrorHandler from "../../Utils/asyncErrorHandler.js";
import CustomError from "../../Utils/CustomError.js";
import { response } from "../Auth/authController.js";

// Update user password
export const updatePassword = asyncErrorHandler(async function (
  req,
  res,
  next
) {
  // 1. Get current user data from database
  const user = await User.findById(req.user._id).select("+password");
  // console.log(user);

  // 2. Check if password saved on db match with sent password
  if (
    !(await user.comparePasswordInDb(req.body.currentPassword, user.password))
  ) {
    return next(
      new CustomError("The current password you provided is wrong!", 401)
    );
  }

  // 3. If sent password is correct, update password with new password
  user.password = req.body.newPassword;
  user.confirmPassword = req.body.confirmNewPassword;

  await user.save(); //save the changes

  // 4. Login user and send jwt
  response(res, 200, user);
});
