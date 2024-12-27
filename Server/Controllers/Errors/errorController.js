import CustomError from "../../Utils/CustomError.js";

function developmentErrors(res, error) {
  res.status(error.statusCode).json({
    statusCode: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
}

function productionErrors(res, error) {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      statusCode: "Internal server error!",
      message: "Something went wrong please try again later...",
    });
  }
}

// Invalid mongoose ID error handler
function invalidId(error) {
  const message = `Invalid Value: ${error.value} for field: ${error.path}`;

  return new CustomError(message, 400);
}

// Duplicate unique key error handler
function duplicateKey(error) {
  const name = error.keyValue.name;
  const message = `Sorry there is already a recipe with the name: ${name}, please try another name...`;

  return new CustomError(message, 400);
}

// Mongoose validation error handler
function validationError(error) {
  const errors = Object.values(error.errors).map((value) => {
    return value.message;
  });
  const message = `${errors.join(". ")}`;

  return new CustomError(message, 400);
}

//////////////////////////////////////////////////
function globalErrorHandler(error, req, res, next) {
  // console.log("Error");
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Error";

  // Sending error response
  if (process.env.NODE_ENV === "development") {
    developmentErrors(res, error);
  } else if (process.env.NODE_ENV === "production") {
    // if invalid mongoose ID error
    if (error.name === "CastError") {
      error = invalidId(error);
    }

    // If duplicate key error
    if (error.code === 11000) {
      error = duplicateKey(error);
    }

    // Mongoose validation errors
    if (error.name === "ValidationError") {
      error = validationError(error);
    }

    productionErrors(res, error);
  }

  next();
}

export default globalErrorHandler;
