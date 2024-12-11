import User from "../../Models/User/userModel.js";
import asyncErrorHandler from "../../Utils/asyncErrorHandler.js";
import CustomError from "../../Utils/CustomError.js";
import { response } from "../Auth/authController.js";

// Get all users
export const getAllUsers = asyncErrorHandler(async function (req, res, next) {
  const users = await User.find({ active: { $ne: false } });

  res.status(200).json({
    status: "Success!",
    result: users.length,
    data: {
      users,
    },
  });
});

// Get a user
export const getUser=asyncErrorHandler(async function (req,res,next) {
  const { id } = req.params
  const user = await User.findById(id)
  // console.log(user)
  if(!user){
    const error = new CustomError("User not found!", 404);
    return next(error);
  }
  // Successfull
  res.status(200).json({
    status: "Success!",
    requestedAt: new Date().toISOString(),
    data: {
      user,
    },
  });
  
})

// Update user password functionality
export const updatePassword = asyncErrorHandler(async function (
  req,
  res,
  next
) {
  // 1. Get current user data from database
  const user = await User.findById(req.user._id).select("+password");
  // console.log(user);

  // 2. Check if password saved on db match with sent password
  const { currentPassword } = req.body;

  if (!(await user.comparePasswordInDb(currentPassword, user.password))) {
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

// Update current user details
export const updateDetails = asyncErrorHandler(async function (req, res, next) {
  //1. Confirm if the user has also provided the password and confirm password
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new CustomError(
        "You can not update your password using this endpoint!",
        400
      )
    );
  }

  // 2. Update the user details
  function filterReqObj(obj, ...allowedFields) {
    const newObj = {};
    Object.keys(obj).forEach((property) => {
      if (allowedFields.includes(property)) {
        newObj[property] = obj[property];
      }
    });
    return newObj;
  }
  const filterObj = filterReqObj(req.body, "username", "email", "avatar"); //Only fields that will be updated

  const user = await User.findByIdAndUpdate(req.user._id, filterObj, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: "Success!",
    message: "User profile updated successfully!",
  });
});

// Soft delete user account
export const deleteAccount = asyncErrorHandler(async function (req, res, next) {
  const user = await User.findByIdAndUpdate(req.user._id, { active: false });
  res.status(200).json({
    status: "Success!",
    data: null,
  });
});
