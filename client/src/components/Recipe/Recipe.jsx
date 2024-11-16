import { Link } from "react-router-dom";

function Recipe({ recipe }) {
  // Date formatting
  const date = new Date(recipe.createdAt);

  const uploadedOn = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link to={`/recipe/${recipe._id}`}>
      <div className="recipe">
        <img src="images/placeholder/placeholder.png" alt={`${recipe.name}`} />
        <div className="content">
          <p className="uploadedOn">
            Uploaded on: <span>{uploadedOn}</span>
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
