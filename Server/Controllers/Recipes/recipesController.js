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
    .search()
    .category();

  // console.log(features);

  const { queryObj: query } = features;

  const recipes = await query;

  const recipeCount = await Recipe.countDocuments();
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  if (req.query.page && skip >= recipeCount) {
    return res.status(404).json({
      status: "Failed!",
      message: "Page not found!",
    });
  }

  // Successfull
  res.status(200).json({
    status: "Success!",
    page, // Current page
    items: recipes.length, // total Items on this page
    totalPages: Math.ceil(recipeCount / limit), // Total pages
    itemsPerPage: limit, // Items per page
    totalItems: recipeCount, // Total recipes
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

export const getUserRecipes = asyncErrorHandler(async (req, res, next) => {
  // Check if the user is authenticated
  if (!req.user) {
    return res.status(401).json({
      status: "Failed!",
      message: "Not authorized.",
    });
  }

  const features = new ApiFeatures(
    Recipe.find({ user: req.user.id }), // Filter recipes by user ID
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .search();

  const { queryObj: query } = features;
  const recipes = await query;

  const recipeCount = await Recipe.countDocuments({ user: req.user.id });
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  if (req.query.page && skip >= recipeCount && recipeCount > 0) {
    return res.status(404).json({
      status: "Failed!",
      message: "Page not found!",
    });
  }

  res.status(200).json({
    status: "Success!",
    page,
    items: recipes.length,
    totalPages: Math.ceil(recipeCount / limit),
    itemsPerPage: limit,
    totalItems: recipeCount,
    requestedAt: new Date().toISOString(),
    data: {
      recipes,
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

  // 1. Find the recipe by ID
  const recipe = await Recipe.findById(id);

  // 2. Check if recipe exists
  if (!recipe) {
    const error = new CustomError("Recipe not found!", 404);
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

  // 4. If an image is uploaded, update the recipe image
  if (req.file) {
    recipe.image = req.file.path;
    await recipe.save(); // Save the updated image to the database
  }

  // 5. If the formData was passed as JSON (through `req.body.data`), parse and update other fields
  const updatedData = req.body.data ? JSON.parse(req.body.data) : {}; // Extract and parse the other fields

  const updatedRecipe = await Recipe.findByIdAndUpdate(
    id,
    { ...updatedData, image: recipe.image },
    {
      new: true,
      runValidators: true,
    }
  );
  // Return success response
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
