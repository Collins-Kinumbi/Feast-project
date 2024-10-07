import express from "express";
import morgan from "morgan";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

/* API recipe routes */
// Route handlers
function getRecipes(req, res) {
  res.status(200).json({ message: "All gotten!" });
}

function getRecipe(req, res) {
  console.log(req.params);
  res.status(200).json({ message: "Gotten by id!" });
}

function addRecipe(req, res) {
  console.log(req.body);
  res.status(200).json({ message: "Posted!" });
}

function updateRecipe(req, res) {
  console.log(req.params);
  console.log(req.body);
  res.status(200).json({ message: "Patch!" });
}

function deleteRecipe(req, res) {
  console.log(req.params);
  res.status(200).json({ message: "Deleted!" });
}

// All recipes
app
  .route("/api/v1/recipes")
  // GET all recipes
  .get(getRecipes)
  // POST/ADD a recipe
  .post(addRecipe);

//Single recipe
app
  .route("/api/v1/recipes/:id")
  // GET a recipe
  .get(getRecipe)
  // UPDATE a recipe
  .patch(updateRecipe)
  // Delete a recipe
  .delete(deleteRecipe);

export default app;
