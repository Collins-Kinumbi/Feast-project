import { Link } from "react-router-dom";
import formatDate from "../../utils/Date";

function MyRecipe({ recipe, onDelete }) {
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the recipe "${recipe.name}"?`
    );
    if (confirmed) {
      onDelete(recipe._id);
    }
  };

  return (
    <div className="my-recipe">
      <Link to={`/recipe/${recipe._id}`}>
        <img src={recipe.image} alt={`${recipe.name}`} />
        <div className="content">
          <p className="uploadedOn">
            Uploaded on: <span>{formatDate(recipe.createdAt)}</span>
          </p>
          <p className="recipeName">{recipe.name}</p>
          <p className="description">{recipe.description}</p>
        </div>
      </Link>
      <div className="actions">
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default MyRecipe;
