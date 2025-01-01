import express from "express";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import cors from "cors";
import cookieParser from "cookie-parser";

import recipesRouter from "./Routes/Recipes/recipesRoutes.js";
import authRouter from "./Routes/Auth/authRouter.js";
import usersRouter from "./Routes/Users/usersRouter.js";
import globalErrorHandler from "./Controllers/Errors/errorController.js";
import handleUncaughtExceptions from "./Middleware/handleUncaughtExceptions.js";
import requestLogger from "./Middleware/requestLoger.js";
import limiter from "./Middleware/rateLimiter.js";
import { sanitizeRequestBody } from "./Middleware/sanitizeRequestBody.js";
import notFoundHandler from "./Middleware/notFoundHandler.js";

handleUncaughtExceptions();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// app.use(cookieParser());

app.use(cookieParser(process.env.SECRET_STRING));

app.use(helmet());

app.use("/api", limiter); //Rate limiter

requestLogger(app); //Logs requests

app.use(express.json({ limit: "10kb" }));

app.use(ExpressMongoSanitize()); //Sanitize against NoSQL query injection

app.use(sanitizeRequestBody); //Sanitize against cross site scripting

app.use(hpp({ whitelist: ["serving", "servingYield", "ratings"] })); //Preventing parameter pollution

// Welcome
app.get("/api/v1/welcome", (req, res) => {
  res.status(200).send({ message: "Welcome to Feast..." });
});

// Recipes
app.use("/api/v1/recipes", recipesRouter);

// Auth
app.use("/api/v1/auth", authRouter);

//Users
app.use("/api/v1/users", usersRouter);

//For all not undefined routes
app.all("*", notFoundHandler);

// Global error handling middleware
app.use(globalErrorHandler);

export default app;
