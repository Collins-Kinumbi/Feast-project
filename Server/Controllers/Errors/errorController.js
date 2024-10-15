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

//////////////////////////////////////////////////
function globalErrorHandler(error, req, res, next) {
  // console.log("Error");
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Error";

  // Sending error response
  if (process.env.NODE_ENV === "development") {
    developmentErrors(res, error);
  } else if (process.env.NODE_ENV === "production") {
    productionErrors(res, error);
  }

  next();
}

export default globalErrorHandler;
