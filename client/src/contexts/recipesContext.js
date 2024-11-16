import { createContext } from "react";
import { useEffect, useState } from "react";

export const recipeContext = createContext();

function RecipesContextProvider({ children }) {
  const [recipes, setRecipes] = useState(null);

  // Fetch all recipes
  useEffect(() => {
    async function fetchRecipies() {
      try {
        const response = await fetch("http://localhost:4000/api/v1/recipes");

        // console.log(response);
        const resData = await response.json();
        // console.log(resData);
        const { recipes } = resData.data;
        console.log(recipes);
        setRecipes(recipes);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchRecipies();
  }, [recipes]);

  return (
    <recipeContext.Provider value={{ recipes }}>
      {children}
    </recipeContext.Provider>
  );
}

export default RecipesContextProvider;
