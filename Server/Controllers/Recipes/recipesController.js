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
    .paginate()
    .search();

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
  const {
    name,
    description,
    nutrition,
    ingredients,
    instructions,
    categories,
    serving,
    servingYield,
  } = req.body;

  // Cloudinary image URL
  const imageUrl = req.file.path;

  const recipe = await Recipe.create({
    name,
    image: imageUrl,
    description,
    nutrition,
    ingredients,
    instructions,
    categories,
    serving,
    servingYield,
    user: req.user._id, //Associate recipe with user's ID
  });

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

  // 1. Find recipe by ID
  const recipe = await Recipe.findById(id);

  // 2. Check if recipe is falsy
  if (!recipe) {
    const error = new CustomError("Recipe not found!", 404);

    // Return in order stop code execution below
    return next(error);
  }

  // 3. Check if the user is admin or owns the recipe
  if (
    req.user.role !== "admin" &&
    recipe.user.toString() !== req.user._id.toString()
  ) {
    return next(
      new CustomError("You do not have authorization to edit this recipe", 403)
    );
  }

  // 4. If authorized update recipe
  const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  // Successfull
  res.status(200).json({
    status: "Success!",
    data: {
      recipe: updatedRecipe,
    },
  });
});

export const deleteRecipe = asyncErrorHandler(async function (req, res, next) {
  const { id } = req.params;

  // 1. Find recipe by ID
  const recipe = await Recipe.findById(id);

  // 2. Check if recipe is falsy
  if (!recipe) {
    const error = new CustomError("Recipe not found!", 404);

    // Return in order stop code execution below
    return next(error);
  }

  // 3. Check if the user is admin or owns the recipe
  if (
    req.user.role !== "admin" &&
    recipe.user.toString() !== req.user._id.toString()
  ) {
    return next(
      new CustomError(
        "You do not have authorization to delete this recipe",
        403
      )
    );
  }

  // 4. Proceed with deletion if authorized
  await Recipe.findByIdAndDelete(id);

  // Successfull
  res.status(200).json({
    status: "Success!",
    message: "Recipe successfully deleted!",
  });
});
