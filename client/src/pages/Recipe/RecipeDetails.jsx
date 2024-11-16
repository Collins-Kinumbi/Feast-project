import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import formatDate from "../../utils/Date";

function RecipeDetails() {
  const { id } = useParams(); //Get id from url
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      setIsLoading(true);
      try {
        setError(null);
        const response = await fetch(
          `http://localhost:4000/api/v1/recipes/${id}`
        );
        if (!response.ok) {
          return setError("Sorry something went wrong...");
        }
        const resData = await response.json();
        // console.log(resData);
        const { recipe } = resData.data;
        console.log(recipe);
        setRecipe(recipe);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecipe();
  }, [id]);

  return (
    <>
      {isLoading && <p className="loading">Loading recipe...</p>}
      {error && <p className="error">{error}</p>}
      {recipe && (
        <div className="recipe-details">
          <img src={"images/placeholder/placeholder.png"} alt={recipe.name} />
          <h1>{recipe.name}</h1>
          <p>
            <strong>Description:</strong> {recipe.description}
          </p>
          <p>
            <strong>Uploaded by:</strong> {recipe.user}
          </p>
          <p>
            <strong>Uploaded on:</strong> {formatDate(recipe.createdAt)}
          </p>
          <p>
            <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
          </p>
          <p>
            <strong>Instructions:</strong> {recipe.instructions}
          </p>
        </div>
      )}
    </>
  );
}

export default RecipeDetails;
