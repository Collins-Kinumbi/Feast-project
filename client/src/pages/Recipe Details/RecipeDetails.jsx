import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeDetailsCard from "../../components/Recipe Details Card/RecipeDetailsCard";
import Error from "../../components/Error/Error";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/recipes/${id}`
        );
        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
          return;
        }
        setRecipe(data.data.recipe);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecipe();
  }, [id]);

  return (
    <div className="recipe-page">
      {error && <Error message={error} />}
      <RecipeDetailsCard recipe={recipe} loading={isLoading} />
    </div>
  );
}

export default RecipeDetails;
