import { useContext } from "react";
import { Link } from "react-router-dom";
import { recipeContext } from "../../contexts/recipesContext";
// Components
import Recipe from "../../components/Recipe/Recipe";

function Home() {
  const { recipes } = useContext(recipeContext);
  return (
    <div className="home">
      <Link to="/create" className="create">
        Create a recipe <span>+</span>
      </Link>
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
