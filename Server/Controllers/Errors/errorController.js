function globalErrorHandler(error, req, res, next) {
  // console.log("Error");
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Error";

  // Sending error response
  res.status(error.statusCode).json({
    statusCode: error.statusCode,
    status: error.status,
    message: error.message,
  });

  next();
}

export default globalErrorHandler;
