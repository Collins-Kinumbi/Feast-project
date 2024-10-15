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
  const { id } = req.params;

  const recipe = await Recipe.findById(id);

  // Check if recipe is falsy
  if (!recipe) {
    const error = new CustomError("Recipe not found!", 404);

    // Return in order stop code execution below
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
});

export const addRecipe = asyncErrorHandler(async function (req, res, next) {
  // Create a new recipe
  const recipe = await Recipe.create(req.body);

  // Successfull
  res.status(200).json({
    status: "Success!",
    data: {
      recipe,
    },
  });
});

export const updateRecipe = asyncErrorHandler(async function (req, res, next) {
  const { id } = req.params;

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
});

export const deleteRecipe = asyncErrorHandler(async function (req, res, next) {
  const { id } = req.params;

  const recipe = await Recipe.findByIdAndDelete(id);

  // Check if recipe is falsy
  if (!recipe) {
    const error = new CustomError("Recipe not found!", 404);

    // Return in order stop code execution below
    return next(error);
  }

  // Successfull
  res.status(200).json({
    status: "Success",
    message: "Recipe successfully deleted!",
  });
});
