import { createContext } from "react";
import { useEffect, useState } from "react";

export const recipeContext = createContext();

function RecipesContextProvider({ children }) {
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all recipes
  useEffect(() => {
    async function fetchRecipies() {
      setIsLoading(true);
      try {
        setError(null);
        const response = await fetch("http://localhost:4000/api/v1/recipes");

        // console.log(response);
        if (!response.ok) {
          return setError("Sorry something went wrong...");
        }
        const resData = await response.json();
        // console.log(resData);
        const { recipes } = resData.data;
        // console.log(recipes);
        setRecipes(recipes);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecipies();
  }, []);

  return (
    <recipeContext.Provider value={{ recipes, isLoading, error }}>
      {children}
    </recipeContext.Provider>
  );
}

export default RecipesContextProvider;
