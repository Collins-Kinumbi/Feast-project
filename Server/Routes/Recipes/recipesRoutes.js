import express from "express";
import {
  getRecipes,
  getRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe,
} from "../../Controllers/Recipes/recipesController.js";

/* API recipe routes */
// All recipes
const router = express.Router();

router
  .route("/")
  // GET all recipes
  .get(getRecipes)
  // POST/ADD a recipe
  .post(addRecipe);

//Single recipe
router
  .route("/:id")
  // GET a recipe
  .get(getRecipe)
  // UPDATE a recipe
  .patch(updateRecipe)
  // Delete a recipe
  .delete(deleteRecipe);

export default router;
