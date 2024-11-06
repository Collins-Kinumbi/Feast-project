import CustomError from "../Utils/CustomError.js";

const notFoundHandler = (req, res, next) => {
  // Create an instance of my CustormError class
  const error = new CustomError(
    `Can't find ${req.originalUrl} on the server`,
    404
  );

  // Passing error object into next function
  next(error);
};

export default notFoundHandler;
