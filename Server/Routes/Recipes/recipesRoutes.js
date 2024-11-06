import express from "express";
import {
  getRecipes,
  getRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe,
} from "../../Controllers/Recipes/recipesController.js";

import { protect, restrictTo } from "../../Controllers/Auth/authController.js";

/* API recipe routes */
// All recipes
const router = express.Router();

router
  .route("/")
  // GET all recipes
  .get(getRecipes)
  // POST/ADD a recipe
  .post(protect, addRecipe);

//Single recipe
router
  .route("/:id")
  // GET a recipe
  .get(getRecipe)
  // UPDATE a recipe
  .patch(protect, restrictTo("admin", "user"), updateRecipe)
  // Delete a recipe
  .delete(protect, restrictTo("admin", "user"), deleteRecipe);

export default router;
