import React, { useState } from "react";
import categoriesList from "../../utils/Categories";
import RecipeForm from "../../components/Recipe Form/RecipeForm";

function CreateRecipe() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: [""],
    instructions: [""],
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

  async function handleSubmit(e) {
    e.preventDefault();

    const formDataToSend = new FormData(); //FormData instance
    formDataToSend.append("image", image); // Append the image file
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("serving", formData.serving);
    formDataToSend.append("servingYield", formData.servingYield);

    formData.ingredients.forEach((ingredient) => {
      formDataToSend.append("ingredients[]", ingredient);
    });
    formData.instructions.forEach((instruction) => {
      formDataToSend.append("instructions[]", instruction);
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
    <div>
      <RecipeForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        setImage={setImage}
        categoriesList={categoriesList}
      />
    </div>
  );
}

export default CreateRecipe;
