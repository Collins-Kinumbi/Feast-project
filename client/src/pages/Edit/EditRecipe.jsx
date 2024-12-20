import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EditRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const categoriesList = [
    "Appetizer",
    "Baked",
    "BBQ",
    "Beverage",
    "Breakfast",
    "Carnivore",
    "Comfort Food",
    "Dairy-Free",
    "Dessert",
    "Dinner",
    "Frozen",
    "Gluten-Free",
    "Grilled",
    "Healthy",
    "High-Protein",
    "Holiday",
    "Instant Pot",
    "Kid-Friendly",
    "Keto",
    "Lunch",
    "Low-Carb",
    "Low-Fat",
    "Main Course",
    "Nutrient-Dense",
    "Paleo",
    "Party",
    "Quick",
    "Quick & Easy",
    "Raw",
    "Salad",
    "Side Dish",
    "Slow Cooker",
    "Snack",
    "Soup",
    "Spicy",
    "Sugar-Free",
    "Vegan",
    "Vegetarian",
    "Whole30",
  ];

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/recipes/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) throw new Error("Failed to fetch recipe");

        const data = await response.json();
        setRecipe(data.data.recipe);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleNutritionChange = (e) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      nutrition: { ...recipe.nutrition, [name]: value },
    });
  };

  const handleIngredientsChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleInstructionsChange = (index, value) => {
    const newInstructions = [...recipe.instructions];
    newInstructions[index] = value;
    setRecipe({ ...recipe, instructions: newInstructions });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const removeIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const addInstruction = () => {
    setRecipe({ ...recipe, instructions: [...recipe.instructions, ""] });
  };

  const removeInstruction = (index) => {
    const newInstructions = recipe.instructions.filter((_, i) => i !== index);
    setRecipe({ ...recipe, instructions: newInstructions });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const selectedCategories = recipe.categories.includes(value)
      ? recipe.categories.filter((cat) => cat !== value)
      : [...recipe.categories, value];
    setRecipe({ ...recipe, categories: selectedCategories });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    if (image) formDataToSend.append("image", image);

    const recipeData = {
      name: recipe.name,
      description: recipe.description,
      instructions: recipe.instructions,
      serving: recipe.serving,
      servingYield: recipe.servingYield,
      ingredients: recipe.ingredients,
      categories: recipe.categories,
      nutrition: recipe.nutrition,
    };

    formDataToSend.append("data", JSON.stringify(recipeData));

    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/recipes/${id}`,
        {
          method: "PATCH",
          credentials: "include",
          body: formDataToSend,
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Recipe updated successfully!");
    } catch (error) {
      console.error("Error updating recipe:", error.message);
    }
  };

  if (loading)
    return (
      <div className="loading">
        <p>Loading recipe...</p>
      </div>
    );

  if (error)
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );

  return (
    <div className="edit-recipe">
      <h1>Edit Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="section">
          <label htmlFor="name">Recipe Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <hr />
        <div className="section">
          <label htmlFor="image">Upload New Image (Optional)</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {recipe.image && <img src={recipe.image} alt={recipe.name} />}
        </div>
        <hr />
        <div className="section">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={recipe.description}
            onChange={handleInputChange}
            maxLength={500}
            required
          />
        </div>
        <hr />
        <div className="section">
          <label htmlFor="ingredients">Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-item">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientsChange(index, e.target.value)}
                required
              />
              <button type="button" onClick={() => removeIngredient(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addIngredient}>
            Add Ingredient
          </button>
        </div>
        <hr />
        <div className="section">
          <label htmlFor="instructions">Instructions</label>
          {recipe.instructions.map((instruction, index) => (
            <div key={index} className="instruction-item">
              <input
                type="text"
                value={instruction}
                onChange={(e) =>
                  handleInstructionsChange(index, e.target.value)
                }
                required
              />
              <button type="button" onClick={() => removeInstruction(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addInstruction}>
            Add Instruction
          </button>
        </div>
        <hr />
        <div className="section">
          <label>Categories</label>
          <div className="categories">
            {[...new Set([...categoriesList, ...recipe.categories])].map(
              (category) => (
                <div key={category} className="check">
                  <input
                    type="checkbox"
                    value={category}
                    checked={recipe.categories.includes(category)}
                    onChange={handleCategoryChange}
                  />
                  <label>{category}</label>
                </div>
              )
            )}
          </div>
        </div>
        <hr />
        <div className="section">
          <label>Nutrition Information</label>
          {Object.keys(recipe.nutrition).map((key) => (
            <div key={key}>
              <label htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="number"
                id={key}
                name={key}
                value={recipe.nutrition[key]}
                onChange={handleNutritionChange}
              />
            </div>
          ))}
        </div>
        <hr />
        <div className="section">
          <label htmlFor="serving">Serving Size</label>
          <input
            type="number"
            id="serving"
            name="serving"
            value={recipe.serving}
            onChange={handleInputChange}
            required
          />
        </div>
        <hr />
        <div className="section">
          <label htmlFor="servingYield">Serving Yield</label>
          <input
            type="number"
            id="servingYield"
            name="servingYield"
            value={recipe.servingYield}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditRecipe;
