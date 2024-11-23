import { useState } from "react";

function Create() {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    ingredients: [""],
    instructions: "",
    categories: [],
    nutrition: {
      calories: "",
      fats: "",
      carbohydrates: "",
      fibers: "",
      sodium: "",
      vitamins: "",
      minerals: "",
    },
    serving: "",
    servingYield: "",
  });

  const categoriesList = [
    "Vegan",
    "Vegetarian",
    "Gluten-Free",
    "Dairy-Free",
    "Quick",
    "Dessert",
    "Low-Carb",
    "High-Protein",
    "Paleo",
    "Keto",
    "Whole30",
    "Low-Fat",
    "Sugar-Free",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snack",
    "Appetizer",
    "Salad",
    "Soup",
    "Side Dish",
    "Main Course",
    "Beverage",
    "Holiday",
    "Spicy",
    "Comfort Food",
    "Baked",
    "Grilled",
    "Raw",
    "Slow Cooker",
    "Instant Pot",
    "Healthy",
    "Kid-Friendly",
    "Party",
    "BBQ",
    "Frozen",
    "Quick & Easy",
    "Carnivore",
    "Nutrient-Dense",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNutritionChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      nutrition: { ...formData.nutrition, [name]: value },
    });
  };

  const handleIngredientsChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ""] });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const selectedCategories = formData.categories.includes(value)
      ? formData.categories.filter((cat) => cat !== value)
      : [...formData.categories, value];
    setFormData({ ...formData, categories: selectedCategories });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/v1/recipes", {
        method: "POST",
        credentials: "include", // Include cookies for authentication
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Recipe created successfully!");
    } catch (error) {
      console.error("Error creating recipe:", error.message);
    }
  }

  return (
    <div className="create-recipe">
      <h1>Create a Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="section">
          <label htmlFor="name">Recipe Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="section">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="section">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            maxLength={500}
            required
          ></textarea>
        </div>

        <div className="section">
          <label htmlFor="ingredients">Ingredients</label>
          {formData.ingredients.map((ingredient, index) => (
            <input
              className="ingredients"
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientsChange(index, e.target.value)}
              required
            />
          ))}
          <button type="button" onClick={addIngredient}>
            Add Ingredient
          </button>
        </div>

        <div className="section">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <div className="section">
          <label>Categories</label>
          <div className="categories">
            {categoriesList.map((category) => (
              <div key={category} className="check">
                <input
                  type="checkbox"
                  value={category}
                  onChange={handleCategoryChange}
                />
                <label>{category}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <label>Nutrition Information</label>
          {Object.keys(formData.nutrition).map((key) => (
            <div key={key} className="nutrition">
              <label htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="number"
                id={key}
                name={key}
                value={formData.nutrition[key]}
                onChange={handleNutritionChange}
              />
            </div>
          ))}
        </div>

        <div className="section">
          <label htmlFor="serving">Serving Size</label>
          <input
            type="number"
            id="serving"
            name="serving"
            value={formData.serving}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="section">
          <label htmlFor="servingYield">Yield</label>
          <input
            type="number"
            id="servingYield"
            name="servingYield"
            value={formData.servingYield}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
}

export default Create;
