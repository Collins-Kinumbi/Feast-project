import User from "../../Models/User/userModel.js";
import asyncErrorHandler from "../../Utils/asyncErrorHandler.js";
import jwt from "jsonwebtoken";
import CustomError from "../../Utils/CustomError.js";
import sendEmail from "../../Utils/mailer.js";
import crypto from "crypto";

const secret = process.env.SECRET_STRING || "Secret string";

const tokenExpires = process.env.LOGIN_EXPIRES || "1d";

// Returns a jwt token
function getToken(id, email) {
  return jwt.sign({ id: id, user: email }, secret, {
    expiresIn: tokenExpires,
  });
}

// Sending response data
export function response(res, statusCode, user) {
  const token = getToken(user._id, user.email);

  const options = {
    maxAge: process.env.LOGIN_EXPIRES,
    // secure: true,
    httpOnly: true, //prevents offside scripting attacks
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.cookie("jwt", token, options);

  user.password = undefined; //deselect password on user object

  user.active = undefined; //deselect active field from user object

  return res.status(statusCode).json({
    status: "Success!",
    token, //Sending the token back to the client
    data: {
      user,
    },
  });
}

// Create account
export const signup = asyncErrorHandler(async function (req, res, next) {
  // 1. Create the new user
  const { username, email, password, confirmPassword, role } = req.body;

  const user = await User.create({
    username,
    email,
    password,
    confirmPassword,
    role,
  });

  // 2.Login the user
  response(res, 201, user);
});

export const login = asyncErrorHandler(async function (req, res, next) {
  // 1. Read email and pasword from the request body
  const { email, password } = req.body;

  // 2. Check if user has provided email and password
  if (!email) {
    const error = new CustomError(
      "Please provide an email for loggin in!",
      400
    );
    return next(error);
  }
  if (!password) {
    const error = new CustomError("Please provide your login password", 400);
    return next(error);
  }

  // 3. Query for user in database
  const user = await User.findOne({ email: email }).select("+password +active");

  // 4. Check if user from provided email exists in the database
  if (!user) {
    const error = new CustomError("Incorrect email!", 400);
    return next(error);
  }

  // 5. Check if the user account is deleted
  if (!user.active) {
    user.active = true; // Reactivate the user
    await user.save({ validateBeforeSave: false }); // Save without triggering validation
  }

  // 6. Check if passwords match
  if (!(await user.comparePasswordInDb(password, user.password))) {
    const error = new CustomError("Incorrect password!", 400);
    return next(error);
  }

  // 7. Login the user
  const token = getToken(user._id, user.email);

  response(res, 200, user);
});

// Protecting routes
export const protect = asyncErrorHandler(async function (req, res, next) {
  // // 1. Read the token and check if it exists
  // let token = req.headers.authorization || req.headers.Authorization; //checking header
  // // console.log(token);
  // if (token && token.startsWith("Bearer")) {
  //   token = token.split(" ")[1];
  // }
  // // console.log(token);

  let token = req.cookies.jwt;

  if (!token) {
    const error = new CustomError("Please log in!", 401);
    return next(error);
  }
  // 2. Validate the token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, secret);
  } catch (error) {
    return next(new CustomError(error.message, 401));
  }

  // 3. Check if user exists in the database
  const user = await User.findById(decodedToken.id);

  if (!user) {
    const error = new CustomError(
      "User no longer exists or account is inactive!",
      401
    );
    return next(error);
  }

  // 4. Check if user changed passward after token was issued
  if (user.isPasswordReset(decodedToken.iat)) {
    const error = new CustomError(
      "Passord was reset recently please log in again!",
      401
    );
    return next(error);
  }

  // 5. Allow user to access the route
  req.user = user; //Setting user to request object
  next();
});

// Restricting user's power based on role
export const restrictTo = function (...roles) {
  return (req, res, next) => {
    // console.log(roles);//Spread into an array
    if (!roles.includes(req.user.role)) {
      const error = new CustomError(
        "You are not authorized to perform this action!",
        403
      );
      return next(error);
    }
    next();
  };
};

// check auth for persistent login
export const checkAuth = asyncErrorHandler(async function (req, res, next) {
  // // 1. Read the token and check if it exists

  let token = req.cookies.jwt;

  if (!token) {
    const error = new CustomError("You are not logged in!", 401);
    return next(error);
  }
  // 2. Validate the token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, secret);
  } catch (error) {
    return next(new CustomError(error.message, 401));
  }

  // 3. Check if user exists in the database
  const user = await User.findById(decodedToken.id).select("+active");

  if (!user || !user.active) {
    const error = new CustomError(
      "User no longer exists or account is inactive!",
      401
    );
    return next(error);
  }

  // 4. Check if user changed passward after token was issued
  if (user.isPasswordReset(decodedToken.iat)) {
    const error = new CustomError(
      "Passord was reset recently please log in again!",
      401
    );
    return next(error);
  }

  // 5. Renew token (for smoother UX)
  const newToken = getToken(user._id, user.email);
  res.cookie("jwt", newToken, {
    maxAge: process.env.LOGIN_EXPIRES || "1d",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  // 6. Return user data
  user.password = undefined;
  user.active = undefined;
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// Forgot password
export const forgotPassword = asyncErrorHandler(async function (
  req,
  res,
  next
) {
  // 1. Get user based on email
  const { email } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    const error = new CustomError(`User with given email: ${email}`, 404);

    return next(error);
  }

  // 2. Generate a random reset token
  const resetToken = user.generateResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // 3. send email with reset token to user
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetPassword/${resetToken}`;

  const message = `We have recieved a password reset request, please use the link below to reset your password\n\n${resetURL}\n\nThis reset password link will only be valid for 10 minutes`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Forgot password",
      message,
    });

    // Successful
    res.status(200).json({
      status: "Success!",
      message: `Password reset link sent to ${user.email}`,
    });
  } catch (error) {
    console.log(error);
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpire = undefined;
    user.save({ validateBeforeSave: false });
    return next(
      new CustomError("There was an error sending password reset email", 500)
    );
  }
});

// Reset password
export const resetPassword = asyncErrorHandler(async function (req, res, next) {
  const resetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: resetToken,
    passwordResetTokenExpire: { $gt: Date.now() },
  }); //compare password reset token and check if the token has expired

  if (!user) {
    const error = new CustomError("Token is invalid or has expired!", 400);
    return next(error);
  }

  // Resetting the user password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpire = undefined;
  user.passwordResetAt = Date.now();

  await user.save(); //Save the changes
  response(res, 200, user);
});
