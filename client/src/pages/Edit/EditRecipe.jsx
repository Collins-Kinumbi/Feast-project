import React, { useState, useEffect } from "react";
import categoriesList from "../../utils/Categories";
import RecipeForm from "../../components/Recipe Form/RecipeForm";
import { useParams } from "react-router-dom";

function EditRecipe() {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Recipe Data
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/recipes/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }

        const data = await response.json();
        setFormData(data.data.recipe);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    if (image) {
      formDataToSend.append("image", image);
    }

    // Construct JSON recipe data from `formData`
    const recipeData = {
      name: formData.name,
      description: formData.description,
      instructions: formData.instructions,
      serving: formData.serving,
      servingYield: formData.servingYield,
      ingredients: formData.ingredients,
      categories: formData.categories,
      nutrition: formData.nutrition,
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
        throw new Error(data.message || "Failed to update recipe");
      }

      alert("Recipe updated successfully!");
    } catch (err) {
      console.error("Error updating recipe:", err.message);
      alert("Error updating recipe: " + err.message);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {formData && (
        <RecipeForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          image={image}
          setImage={setImage}
          categoriesList={categoriesList}
          isEditing={true}
        />
      )}
    </div>
  );
}

export default EditRecipe;
