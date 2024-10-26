import User from "../../Models/User/userModel.js";
import asyncErrorHandler from "../../Utils/asyncErrorHandler.js";

export const signup = asyncErrorHandler(async function (req, res, next) {
  // 1. Create the new user
  const user = await User.create(req.body);

  res.status(201).json({
    status: "Success!",
    data: {
      user,
    },
  });
});
