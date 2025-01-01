import React, { useContext, useState } from "react";
import categoriesList from "../../utils/Categories";
import RecipeForm from "../../components/Recipe Form/RecipeForm";
import { modalContext } from "../../contexts/Modal/modalContext";
import { useNavigate } from "react-router-dom";

function CreateRecipe() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
  const { toggleModal } = useContext(modalContext);
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
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
    setSending(true);

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
      const response = await fetch(`${API_URL}/api/v1/recipes`, {
        method: "POST",
        credentials: "include",
        body: formDataToSend,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      toggleModal("feedback", {
        title: "Success",
        message: "Recipe created successfully!",
        className: "success",
      });
      navigate("/", { replace: true });
    } catch (err) {
      toggleModal("feedback", {
        title: "Error",
        message: `${err.message}`,
        className: "error",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      <RecipeForm
        formData={formData}
        setFormData={setFormData}
        sending={sending}
        handleSubmit={handleSubmit}
        setImage={setImage}
        categoriesList={categoriesList}
      />
    </div>
  );
}

export default CreateRecipe;
