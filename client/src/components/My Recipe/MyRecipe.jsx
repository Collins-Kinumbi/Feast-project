import { Link } from "react-router-dom";
import formatDate from "../../utils/Date";

function MyRecipe({ recipe }) {
  return (
    <Link to={`/recipe/${recipe._id}`}>
      <div className="my-recipe">
        <img src={recipe.image} alt={`${recipe.name}`} />
        <div className="content">
          <p className="uploadedOn">
            Uploaded on: <span>{formatDate(recipe.createdAt)}</span>
          </p>
          <p className="recipeName">{recipe.name}</p>
          <p className="description">{recipe.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default MyRecipe;
