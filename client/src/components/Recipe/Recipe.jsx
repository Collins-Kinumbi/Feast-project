import { Link } from "react-router-dom";
import formatDate from "../../utils/Date";
import RecipeCard from "../skeletons/Recipe/RecipeCard";
import UsernameCard from "../Username/UsernameCard";

function Recipe({
  recipes,
  loading = false,
  showUsername = true,
  showActions = false,
  onDelete = null,
}) {
  const handleDelete = (recipe) => {
    if (!onDelete) return;
    const confirmed = window.confirm(
      `Are you sure you want to delete the recipe "${recipe.name}"?`
    );
    if (confirmed) {
      onDelete(recipe._id);
    }
  };

  return (
    <div className="recipes-container">
      {recipes.length > 0 &&
        recipes.map((recipe) => (
          <div className="recipe-wrapper" key={recipe._id}>
            <Link to={`/recipe/${recipe._id}`}>
              <div className="recipe">
                {loading ? (
                  <RecipeCard />
                ) : (
                  <>
                    <img src={recipe.image} alt={recipe.name} />
                    <div className="content">
                      <p className="uploaded-on">
                        Uploaded on: <span>{formatDate(recipe.createdAt)}</span>
                      </p>
                      <p className="recipe-name">{recipe.name}</p>
                      {showUsername && <UsernameCard userId={recipe.user} />}
                    </div>
                  </>
                )}
              </div>
            </Link>
            {showActions && (
              <div className="actions">
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(recipe)}
                >
                  Delete
                </button>
                <Link to={`/edit-recipe/${recipe._id}`}>
                  <button className="edit-btn">Edit</button>
                </Link>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default Recipe;
