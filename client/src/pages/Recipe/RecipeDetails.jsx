import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import formatDate from "../../utils/Date";

const userCache = new Map(); // Local cache for user data

function RecipeDetails() {
  const { id } = useParams(); // Get id from URL
  const [recipe, setRecipe] = useState(null);
  const [username, setUsername] = useState('');
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
        const { recipe } = resData.data;
        setRecipe(recipe);

        // Fetch username if not cached
        if (recipe.user && !userCache.has(recipe.user)) {
          const userResponse = await fetch(
            `http://localhost:4000/api/v1/users/${recipe.user}`
          );
          if (!userResponse.ok) {
            throw new Error("Failed to fetch user data");
          }
          const userData = await userResponse.json();
          const username = userData.data.user.username;

          // Set username in state and cache it
          setUsername(username);
          userCache.set(recipe.user, username);
        } else {
          // Use cached username if available
          setUsername(userCache.get(recipe.user) || "Unknown");
        }
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
      {isLoading && <p className="loading">Loading recipe...</p>}
      {error && <p className="error">{error}</p>}
      {recipe && (
        <div className="recipe-container">
          <div>
            <img src={recipe.image} alt={recipe.name} />
          </div>
          <div className="content">
            <h1>{recipe.name}</h1>
            <p className="description">{recipe.description}</p>
            <div>
              <p className="poster">
                By: <span>{username || "Loading..."}</span>
              </p>
              <p className="created-on">
                Created on : <span>{formatDate(recipe.createdAt)}</span>
              </p>
              <div className="categories">
                <h2>Categories:</h2>
                <ul>
                  {recipe.categories.map((category) => {
                    return (
                      <li key={category}>
                        <p>{category}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="ingredients">
              <h2>Ingredients:</h2>
              <ul>
                {recipe.ingredients.map((ingredient) => {
                  return <li key={ingredient}>{ingredient}</li>;
                })}
              </ul>
            </div>
            <div className="instructions">
              <h2>Instructions:</h2>
              <ul>
                {recipe.instructions
                  .match(/(\d+\.\s.+?)(?=(\d+\.\s)|$)/g) // Using regex to turn instructions string into an array
                  .map((instruction) => {
                    return <li key={instruction}>{instruction}</li>;
                  })}
              </ul>
            </div>
            <div className="nutrition">
              <p>
                The table below shows nutritional values per serving without the
                additional fillings.
              </p>
              <h2>Nutrition:</h2>
              <div>
                <p>Calories</p>
                <span>{recipe.nutrition.calories}kcal</span>
              </div>
              <div>
                <p>Carbs</p>
                <span>{recipe.nutrition.carbohydrates}g</span>
              </div>
              <div>
                <p>Proteins</p>
                <span>{recipe.nutrition.proteins}g</span>
              </div>
              <div>
                <p>Fats</p>
                <span>{recipe.nutrition.fats}g</span>
              </div>
            </div>
            <div className="serving">
              <h2>Serving:</h2>
              <div>
                <p>
                  Serving: <span>{recipe.serving}</span>
                </p>
                <p>
                  Serving yield: <span>{recipe.servingYield}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;
