import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Recipe from "../../components/Recipe/Recipe";

function Categories() {
  const { category } = useParams(); // Get category from URL params
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategoryRecipes() {
      setIsLoading(true);
      try {
        setError(null);
        const response = await fetch(
          `http://localhost:4000/api/v1/recipes?category=${category}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipes for the selected category.");
        }
        const resData = await response.json();
        setRecipes(resData.data.recipes); // Adjust based on API structure
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategoryRecipes();
  }, [category]);

  return (
    <div className="categories-page">
      <h1 className="heading">{category} Recipes</h1>
      {error && <p className="error">{error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : recipes.length > 0 ? (
        <Recipe recipes={recipes} loading={isLoading} />
      ) : (
        <p>OOOPS guess there are no {category} recipes yet.</p>
      )}
    </div>
  );
}

export default Categories;
