import mongoose from "mongoose";
import Recipe from "../../Models/Recipe/recipeModel.js";
import ApiFeatures from "../../Utils/apiFeatures.js";
import CustomError from "../../Utils/CustomError.js";
import asyncErrorHandler from "../../Utils/asyncErrorHandler.js";

// Route handlers
export const getRecipes = asyncErrorHandler(async (req, res, next) => {
  const features = new ApiFeatures(Recipe.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  // console.log(features);

  const { queryObj: query } = features;

  const recipes = await query;

  // Successfull
  res.status(200).json({
    status: "Success!",
    items: recipes.length,
    requestedAt: new Date().toISOString(),
    data: {
      recipes,
    },
  });
});

export const getRecipe = asyncErrorHandler(async function (req, res, next) {
  try {
    const { id } = req.params;

    // Check if id is a valid mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new CustomError("Invalid recipe id", 400);

      // Return in order stop code execution bellow
      return next(error);
    }

    const recipe = await Recipe.findById(id);

    // Check if recipe is falsy
    if (!recipe) {
      const error = new CustomError("Recipe not found!", 404);

      // Return in order stop code execution bellow
      return next(error);
    }

    // Successfull
    res.status(200).json({
      status: "Success!",
      requestedAt: new Date().toISOString(),
      data: {
        recipe,
      },
    });
  } catch (err) {
    // Server error
    const error = new CustomError(err.message, 500);

    next(error);
  }
});

export const addRecipe = asyncErrorHandler(async function (req, res, next) {
  try {
    // Create a new recipe
    const recipe = await Recipe.create(req.body);

    // Successfull
    res.status(200).json({
      status: "Success!",
      data: {
        recipe,
      },
    });
  } catch (err) {
    // If creating a recipe fails
    const error = new CustomError(err.message, 400);

    next(error);
  }
});

export const updateRecipe = asyncErrorHandler(async function (req, res, next) {
  try {
    const { id } = req.params;

    // Check if id is a valid mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new CustomError("Invalid recipe id", 400);

      // Return in order stop code execution bellow
      return next(error);
    }

    // Find recipe and update
    const recipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    // Check if recipe is falsy
    if (!recipe) {
      const error = new CustomError("Recipe not found!", 404);

      // Return in order stop code execution bellow
      return next(error);
    }

    // Successfull
    res.status(200).json({
      status: "Success!",
      data: {
        recipe,
      },
    });
  } catch (err) {
    // Server error
    const error = new CustomError(err.message, 500);

    next(error);
  }
});

export const deleteRecipe = asyncErrorHandler(async function (req, res, next) {
  try {
    const { id } = req.params;

    // Check if id is a valid mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new CustomError("Invalid recipe id", 400);

      // Return in order stop code execution bellow
      return next(error);
    }

    const recipe = await Recipe.findByIdAndDelete(id);

    // Check if recipe is falsy
    if (!recipe) {
      const error = new CustomError("Recipe not found!", 404);

      // Return in order stop code execution bellow
      return next(error);
    }

    // Successfull
    res.status(200).json({
      status: "Success",
      message: "Recipe successfully deleted!",
    });
  } catch (err) {
    // Server error
    const error = new CustomError(err.message, 500);

    next(error);
  }
});
