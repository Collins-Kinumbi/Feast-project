import { Link } from "react-router-dom";
import formatDate from "../../utils/Date";

function Recipe({ recipe }) {
  return (
    <Link to={`/recipe/${recipe._id}`}>
      <div className="recipe">
        <img src="images/placeholder/placeholder.png" alt={`${recipe.name}`} />
        <div className="content">
          <p className="uploadedOn">
            Uploaded on: <span>{formatDate(recipe.createdAt)}</span>
          </p>
          <p className="recipeName">{recipe.name}</p>
          <p className="user">
            By <span>{recipe.user}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Recipe;
