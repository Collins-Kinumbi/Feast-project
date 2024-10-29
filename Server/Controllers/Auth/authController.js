import User from "../../Models/User/userModel.js";
import asyncErrorHandler from "../../Utils/asyncErrorHandler.js";
import jwt from "jsonwebtoken";
import CustomError from "../../Utils/CustomError.js";

const secret = process.env.SECRET_STRING || "Secret string";

const tokenExpires = process.env.LOGIN_EXPIRES || "1d";

// Returns a jwt token
function getToken(id, email) {
  return jwt.sign({ id: id, user: email }, secret, {
    expiresIn: tokenExpires,
  });
}

// Sending response data
function response(res, statusCode, token, user = undefined) {
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
  const { username, email, password, confirmPassword } = req.body;

  const user = await User.create({
    username,
    email,
    password,
    confirmPassword,
  });

  // 2. Create a json web token
  const token = getToken(user._id, user.email);

  // 3.Login the user
  response(res, 201, token, user);
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
  const user = await User.findOne({ email: email }).select("+password");

  // 4. Check if user from provided email exists in the database
  if (!user) {
    const error = new CustomError("Incorrect email!", 400);
    return next(error);
  }

  // 5. Check if passwords match
  if (!(await user.comparePasswordInDb(password, user.password))) {
    const error = new CustomError("Incorrect password!", 400);
    return next(error);
  }

  // 6. Login the user
  const token = getToken(user._id, user.email);

  response(res, 200, token);
});

// Protecting routes
export const protect = asyncErrorHandler(async function (req, res, next) {
  // 1. Read the token and check if it exists
  let token = req.headers.authorization || req.headers.Authorization; //checking header
  // console.log(token);
  if (token && token.startsWith("Bearer")) {
    token = token.split(" ")[1];
  }
  // console.log(token);
  if (!token) {
    const error = new CustomError("Please log in!", 401);
    return next(error);
  }
  // 2. Validate the token
  const decodedToken = jwt.verify(token, secret, function (err, decodedToken) {
    if (err) return next(new CustomError(err.message, 401));
    // console.log(decodedToken);
    return decodedToken;
  });

  if (!decodedToken) return;

  // 3. Check if user exists in the database
  const user = await User.findById(decodedToken.id);

  if (!user) {
    const error = new CustomError(
      "The user with given the token does not exist!",
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
  next();
});
