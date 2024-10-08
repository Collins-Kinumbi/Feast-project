import mongoose from "mongoose";
import Recipe from "../../Models/Recipe/recipeModel.js";

// Route handlers
export async function getRecipes(req, res) {
  try {
    const recipes = await Recipe.find();

    // Check if recipes arr is empty
    if (recipes.length === 0) {
      return res.status(404).json({
        status: "Failed!",
        message: "No recipes found",
      });
    }

    // Successfull
    res.status(200).json({
      status: "Success!",
      items: recipes.length,
      requestedAt: new Date().toISOString(),
      data: {
        recipes,
      },
    });
  } catch (err) {
    // Server error
    res.status(500).json({
      status: "Failed!",
      message: err.message,
    });
  }
}

export async function getRecipe(req, res) {
  try {
    const { id } = req.params;

    // Check if id is a valid mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "Failed!",
        message: "Invalid recipe id",
      });
    }

    const recipe = await Recipe.findById(id);

    // Check if recipe is falsy
    if (!recipe) {
      return res.status(404).json({
        status: "Failed!",
        message: "Recipe not found!",
      });
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
    // Internal server error
    res.status(500).json({
      status: "Failed!",
      message: err.message,
    });
  }
}

export async function addRecipe(req, res) {
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
    res.status(400).json({
      status: "Failed!",
      message: err.message,
    });
  }
}

export async function updateRecipe(req, res) {
  try {
    const { id } = req.params;

    // Check if id is a valid mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "Failed!",
        message: "Invalid recipe id",
      });
    }

    // Find recipe and update
    const recipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    // Check if recipe is falsy
    if (!recipe) {
      return res.status(404).json({
        status: "Failed!",
        message: "Recipe not found!",
      });
    }

    // Successfull
    res.status(200).json({
      status: "Success!",
      data: {
        recipe,
      },
    });
  } catch (err) {
    // Internal server error
    res.status(500).json({
      status: "Failed!",
      message: err.message,
    });
  }
}

export async function deleteRecipe(req, res) {
  try {
    const { id } = req.params;

    // Check if id is a valid mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "Failed!",
        message: "Invalid recipe id",
      });
    }

    const recipe = await Recipe.findByIdAndDelete(id);

    // Check if recipe is falsy
    if (!recipe) {
      return res.status(404).json({
        status: "Failed!",
        message: "Recipe not found!",
      });
    }

    // Successfull
    res.status(200).json({
      status: "Success",
      message: "Recipe successfully deleted!",
    });
  } catch (err) {
    // Internal server error
    res.status(500).json({
      status: "Failed!",
      message: err.message,
    });
  }
}
