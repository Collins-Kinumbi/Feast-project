class CustomError extends Error {
  constructor(message, statusCode) {
    super(message); //Error constructor
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "Failed!" : "Error";

    this.isOperational = true;

    // Capturing the stack trace of the base Error class
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
