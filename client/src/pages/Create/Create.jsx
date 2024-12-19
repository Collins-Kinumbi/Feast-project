import { useState } from "react";

function Create() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: [""],
    instructions: "",
    categories: [],
    nutrition: {
      calories: "",
      proteins: "",
      fats: "",
      carbohydrates: "",
    },
    serving: "",
    servingYield: "",
  });
  const [image, setImage] = useState(null);

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

  const removeIngredient = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ingredients: prevFormData.ingredients.filter((_, i) => i !== index),
    }));
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

    const formDataToSend = new FormData(); //FormData instance
    formDataToSend.append("image", image); // Append the image file
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("instructions", formData.instructions);
    formDataToSend.append("serving", formData.serving);
    formDataToSend.append("servingYield", formData.servingYield);

    formData.ingredients.forEach((ingredient) => {
      formDataToSend.append("ingredients[]", ingredient);
    });
    formData.categories.forEach((category) => {
      formDataToSend.append("categories[]", category);
    });

    Object.keys(formData.nutrition).forEach((key) => {
      formDataToSend.append(`nutrition[${key}]`, formData.nutrition[key]);
    });

    try {
      const response = await fetch("http://localhost:4000/api/v1/recipes", {
        method: "POST",
        credentials: "include",
        body: formDataToSend,
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
        <hr />
        <div className="section">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} // Handle file directly
            required
          />
        </div>
        <hr />
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
        <hr />
        <div className="section">
          <label htmlFor="ingredients">Ingredients</label>
          {formData.ingredients.map((ingredient, index) => (
            <div className="ingredient-item" key={index}>
              <input
                className="ingredients"
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
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <hr />
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
        <hr />
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
        <hr />
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
        <hr />
        <div className="section">
          <label htmlFor="servingYield">Serving Yield</label>
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
