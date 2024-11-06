// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UncaughtExpeption occured shutting down...");

  process.exit(1);
});

import express from "express";
import morgan from "morgan";
import recipesRouter from "./Routes/Recipes/recipesRoutes.js";
import CustomError from "./Utils/CustomError.js";
import globalErrorHandler from "./Controllers/Errors/ErrorController.js";
import rateLimit from "express-rate-limit";
import authRouter from "./Routes/Auth/authRouter.js";
import usersRouter from "./Routes/Users/usersRouter.js";

const app = express();

let limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message:
    "We have recieved to many requests from this IP. Please try again after one hour",
});
app.use("/api", limiter);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

// Recipes
app.use("/api/v1/recipes", recipesRouter);

// Auth
app.use("/api/v1/auth", authRouter);

//Users
app.use("/api/v1/users", usersRouter);

//For all not undefined routes
app.all("*", (req, res, next) => {
  // Create an instance of my CustormError class
  const error = new CustomError(
    `Can't find ${req.originalUrl} on the server`,
    404
  );

  // Passing error object into next function
  next(error);
});

// Global error handling middleware
app.use(globalErrorHandler);

export default app;
