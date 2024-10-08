import mongoose from "mongoose";
import Recipe from "../../Models/Recipe/recipeModel.js";

// Route handlers
export async function getRecipes(req, res) {
  try {
    const recipes = await Recipe.find();

    if (recipes.length === 0) {
      return res.status(404).json({
        status: "Failed!",
        message: "No recipes found",
      });
    }

    res.status(200).json({
      status: "Success!",
      items: recipes.length,
      requestedAt: new Date().toISOString(),
      data: {
        recipes,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed!",
      message: err.message,
    });
  }
}

export async function getRecipe(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "Failed!",
        message: "Invalid recipe id",
      });
    }

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({
        status: "Failed!",
        message: "Recipe not found!",
      });
    }

    res.status(200).json({
      status: "Success!",
      requestedAt: new Date().toISOString(),
      data: {
        recipe,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed!",
      message: err.message,
    });
  }
}

export async function addRecipe(req, res) {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(200).json({
      status: "Success!",
      data: {
        recipe,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed!",
      message: err.message,
    });
  }
}

export async function updateRecipe(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "Failed!",
        message: "Invalid recipe id",
      });
    }

    const recipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!recipe) {
      return res.status(404).json({
        status: "Failed!",
        message: "Recipe not found!",
      });
    }

    res.status(200).json({
      status: "Success!",
      data: {
        recipe,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed!",
      message: err.message,
    });
  }
}

export function deleteRecipe(req, res) {
  console.log(req.params);
  res.status(200).json({ message: "Deleted!" });
}
