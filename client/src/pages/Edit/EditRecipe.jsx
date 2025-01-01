import React, { useState, useEffect, useContext } from "react";
import categoriesList from "../../utils/Categories";
import RecipeForm from "../../components/Recipe Form/RecipeForm";
import { useNavigate, useParams } from "react-router-dom";
import { modalContext } from "../../contexts/Modal/modalContext";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

function EditRecipe() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

  const { toggleModal } = useContext(modalContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Recipe Data
  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/recipes/${id}`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
          return;
        }

        setFormData(data.data.recipe);
      } catch (err) {
        setError(err.message || "A network error occurred. Please try again");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, API_URL]);

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

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
      const response = await fetch(`${API_URL}/api/v1/recipes/${id}`, {
        method: "PATCH",
        credentials: "include",
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update recipe");
      }

      toggleModal("feedback", {
        title: "Success",
        message: "Recipe updated successfully!",
        className: "success",
      });
      navigate("/my-recipes", { replace: true });
    } catch (err) {
      toggleModal("feedback", {
        title: "Error",
        message: `Failed to update recipe: ${err.message}`,
        className: "error",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      {loading && <Loading />}
      {error && <Error message={error} />}
      {formData && (
        <RecipeForm
          formData={formData}
          sending={sending}
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
