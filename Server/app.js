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
app.all("*", (req, res) => {
  return res.status(404).json({
    status: "Failed!",
    message: `Can't find ${req.originalUrl} on the server`,
  });
});

export default app;
