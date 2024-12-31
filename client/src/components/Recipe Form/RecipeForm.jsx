import "./recipe-form.css";
import LazyLoadedImage from "../../components/Lazy Load Image/LazyLoadedImage";

function RecipeForm({
  formData,
  setFormData,
  sending = false,
  handleSubmit,
  setImage,
  categoriesList,
  isEditing = false,
}) {
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
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleInstructionsChange = (index, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData({ ...formData, instructions: newInstructions });
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, ""],
    });
  };

  const removeInstruction = (index) => {
    const newInstructions = formData.instructions.filter((_, i) => i !== index);
    setFormData({ ...formData, instructions: newInstructions });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const selectedCategories = formData.categories.includes(value)
      ? formData.categories.filter((cat) => cat !== value)
      : [...formData.categories, value];
    setFormData({ ...formData, categories: selectedCategories });
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <h1>{isEditing ? "Edit Recipe" : "Create Recipe"}</h1>
      <div className="section">
        <p>Recipe Name</p>
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
        <p>
          Upload {isEditing ? "New" : ""} Image {isEditing && "(Optional)"}
        </p>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {isEditing && formData.image && (
          <LazyLoadedImage src={formData.image} alt={formData.name} />
        )}
      </div>
      <hr />
      <div className="section">
        <p>Description</p>
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
        <p>Ingredients</p>
        {formData.ingredients.map((ingredient, index) => (
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
        <p>Instructions</p>
        {formData.instructions.map((instruction, index) => (
          <div key={index} className="instruction-item">
            <input
              type="text"
              value={instruction}
              onChange={(e) => handleInstructionsChange(index, e.target.value)}
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
        <p>Categories</p>
        <div className="categories">
          {categoriesList.map((category) => (
            <div key={category} className="check">
              <input
                type="checkbox"
                value={category}
                checked={formData.categories.includes(category)}
                onChange={handleCategoryChange}
              />
              <label>{category}</label>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="section">
        <p>Nutrition Information</p>
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
        <p>Serving</p>
        <div className="serving">
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
        <div className="serving-yield">
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
      </div>
      <button type="submit" disabled={sending}>
        {isEditing ? "Save Changes" : "Create Recipe"}
      </button>
    </form>
  );
}

export default RecipeForm;
