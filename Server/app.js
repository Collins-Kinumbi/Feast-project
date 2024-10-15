import express from "express";
import morgan from "morgan";
import recipesRouter from "./Routes/Recipes/recipesRoutes.js";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

// Recipes
app.use("/api/v1/recipes", recipesRouter);

//For all not undefined routes
app.all("*", (req, res, next) => {
  // Create an instance of the Error class
  const error = new Error(`Can't find ${req.originalUrl} on the server`);
  error.status = "Not found!";
  error.statusCode = 404;

  // Passing error object into next function
  next(error);
});

// Global error handling middleware
app.use((error, req, res, next) => {
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
});

export default app;
