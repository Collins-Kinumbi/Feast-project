import { useContext } from "react";
import { Link } from "react-router-dom";
import { recipeContext } from "../../contexts/Recipes/recipesContext";
// Components
import Recipe from "../../components/Recipe/Recipe";

function Home() {
  const { recipes, isLoading, error } = useContext(recipeContext);

  return (
    <div className="home">
      <Link to="/create" className="create">
        Create a recipe <span>+</span>
      </Link>
      {isLoading && <p className="loading">Loading recipes...</p>}
      {error && <p className="error">{error}</p>}
      <div className="recipes-container">
        {recipes &&
          recipes.map((recipe) => {
            return <Recipe recipe={recipe} key={recipe._id} />;
          })}
      </div>
    </div>
  );
}

export default Home;
