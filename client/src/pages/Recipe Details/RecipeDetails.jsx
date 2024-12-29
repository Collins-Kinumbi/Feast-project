import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeDetailsCard from "../../components/Recipe Details Card/RecipeDetailsCard";
import Loading from "../../components/Loading/Loading";

function RecipeDetails() {
  const { id } = useParams();
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
          throw new Error("Sorry something went wrong...");
        }
        const resData = await response.json();
        setRecipe(resData.data.recipe);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecipe();
  }, [id]);

  return (
    <div className="recipe-page">
      {error && <p>{error}</p>}
      <RecipeDetailsCard recipe={recipe} loading={isLoading} />
    </div>
  );
}

export default RecipeDetails;
