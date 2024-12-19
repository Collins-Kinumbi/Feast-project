import express from "express";
import multer from "multer";
import { storage } from "../../Utils/cloudinary.js";
import {
  getRecipes,
  getRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getUserRecipes,
} from "../../Controllers/Recipes/recipesController.js";

import { protect, restrictTo } from "../../Controllers/Auth/authController.js";

/* API recipe routes */
const router = express.Router();

// Get recipes by user id
router.route("/my-recipes").get(protect, getUserRecipes);

// All recipes
const upload = multer({ storage });

router
  .route("/")
  // GET all recipes
  .get(getRecipes)
  // POST/ADD a recipe
  .post(protect, upload.single("image"), addRecipe);

// Single recipe
router
  .route("/:id")
  // GET a recipe
  .get(getRecipe)
  // UPDATE a recipe
  .patch(
    protect,
    restrictTo("admin", "user"),
    upload.single("image"),
    updateRecipe
  )
  // DELETE a recipe
  .delete(protect, restrictTo("admin", "user"), deleteRecipe);

export default router;
