// Async error handler
function asyncErrorHandler(func) {
  return (req, res, next) => {
    return func(req, res, next).catch((err) => {
      next(err);
    });
  };
}

export default asyncErrorHandler;
