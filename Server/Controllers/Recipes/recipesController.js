import Recipe from "../../Models/Recipe/recipeModel.js";
import ApiFeatures from "../../Utils/apiFeatures.js";
import CustomError from "../../Utils/CustomError.js";
import asyncErrorHandler from "../../Utils/asyncErrorHandler.js";
import cloudinary from "cloudinary";
import { cleanupImage } from "../../Utils/cleanupImage.js";

// Route handlers
export const getRecipes = asyncErrorHandler(async (req, res, next) => {
  // Create an ApiFeatures instance and apply features
  const features = new ApiFeatures(Recipe.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .search()
    .category();

  // Count recipes after filtering but before pagination
  const filteredRecipeCount = await features.queryObj.clone().countDocuments();

  // Apply pagination after filtering
  features.paginate();
  const recipes = await features.queryObj;

  // Total pages calculation
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const totalPages = Math.ceil(filteredRecipeCount / limit);

  // If results are empty, return success with an empty array
  if (recipes.length === 0) {
    return res.status(200).json({
      status: "Success!",
      page,
      items: 0, // Items on this page
      totalPages, // Total pages for the filtered query
      itemsPerPage: limit,
      totalItems: filteredRecipeCount,
      requestedAt: new Date().toISOString(),
      data: {
        recipes: [],
      },
    });
  }

  // Otherwise, return results
  res.status(200).json({
    status: "Success!",
    page,
    items: recipes.length,
    totalPages,
    itemsPerPage: limit,
    totalItems: filteredRecipeCount,
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
  // Extract necessary fields from the request
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

  // Validate Cloudinary upload fields
  const imageUrl = req.file?.path; // Image URL
  const publicId = req.file?.filename; // Unique ID for cleanup

  if (!imageUrl || !publicId) {
    return next(new CustomError("Image upload failed. Please try again!", 400));
  }

  // Create a new recipe in the database
  try {
    const recipe = await Recipe.create({
      name,
      image: {
        url: imageUrl,
        publicId,
      },
      description,
      nutrition,
      ingredients,
      instructions,
      categories,
      serving,
      servingYield,
      user: req.user._id, // Associate recipe with the user's ID
    });

    // Return a successful response
    res.status(200).json({
      status: "Success!",
      data: {
        recipe,
      },
    });
  } catch (error) {
    // Cleanup uploaded image if an error occurs
    await cleanupImage(publicId);
    throw error; // Let the error propagate to the asyncErrorHandler
  }
});

export const updateRecipe = asyncErrorHandler(async function (req, res, next) {
  const { id } = req.params;

  // 1. Find the recipe by ID
  const recipe = await Recipe.findById(id);

  // 2. Check if the recipe exists
  if (!recipe) {
    return next(new CustomError("Recipe not found!", 404));
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

  // 4. If a new image is uploaded
  if (req.file) {
    // If an old image exists, delete it from Cloudinary
    if (recipe.image?.publicId) {
      await cleanupImage(recipe.image.publicId);
    }

    // Update the recipe's image field
    recipe.image = {
      url: req.file.path, // New image URL
      publicId: req.file.filename, // New public ID
    };
  }

  // 5. Parse and update other fields (if provided)
  const updatedData = req.body.data ? JSON.parse(req.body.data) : {};

  // 6. Update other fields in the database while preserving the updated image
  const updatedRecipe = await Recipe.findByIdAndUpdate(
    id,
    {
      ...updatedData,
      image: recipe.image,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  // 7. Return the success response
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

  // 4. Delete the associated image from Cloudinary
  await cleanupImage(recipe.image.publicId);

  // 5. Proceed with deletion if authorized
  await Recipe.findByIdAndDelete(id);

  // Successfull
  res.status(200).json({
    status: "Success!",
    message: "Recipe successfully deleted!",
  });
});
