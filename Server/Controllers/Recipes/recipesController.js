import Recipe from "../../Models/Recipe/recipeModel.js";

// Route handlers
export function getRecipes(req, res) {
  res.status(200).json({ message: "All gotten!" });
}

export function getRecipe(req, res) {
  console.log(req.params);
  res.status(200).json({ message: "Gotten by id!" });
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

export function updateRecipe(req, res) {
  console.log(req.params);
  console.log(req.body);
  res.status(200).json({ message: "Patch!" });
}

export function deleteRecipe(req, res) {
  console.log(req.params);
  res.status(200).json({ message: "Deleted!" });
}
