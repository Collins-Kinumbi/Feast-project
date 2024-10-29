import express from "express";
import {
  getRecipes,
  getRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe,
} from "../../Controllers/Recipes/recipesController.js";

import { protect } from "../../Controllers/Auth/authController.js";

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
  .patch(protect, updateRecipe)
  // Delete a recipe
  .delete(protect, deleteRecipe);

export default router;
