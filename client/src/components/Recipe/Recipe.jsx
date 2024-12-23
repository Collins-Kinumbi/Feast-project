import { Link } from "react-router-dom";
import formatDate from "../../utils/Date";
import { useEffect, useState } from "react";
import RecipeCard from "../skeletons/Recipe/RecipeCard";

const userCache = new Map(); // Local cache for user data

function Recipe({
  recipes,
  loading = false,
  showUsername = true,
  showActions = false,
  onDelete = null,
}) {
  const [usernames, setUsernames] = useState({});

  const fetchUsername = async (userId) => {
    if (userCache.has(userId)) return userCache.get(userId);

    const response = await fetch(
      `http://localhost:4000/api/v1/users/${userId}`
    );
    if (!response.ok) throw new Error("Something went wrong.");
    const resData = await response.json();
    const username = resData.data.user.username;

    // Save to cache
    userCache.set(userId, username);
    return username;
  };

  useEffect(() => {
    const loadUsernames = async () => {
      try {
        const fetchAll = recipes.map(async (recipe) => {
          if (!usernames[recipe.user]) {
            const username = await fetchUsername(recipe.user);
            setUsernames((prev) => ({ ...prev, [recipe.user]: username }));
          }
        });
        await Promise.all(fetchAll);
      } catch (error) {
        console.error("Error loading usernames:", error);
      }
    };

    if (recipes.length > 0 && showUsername) {
      loadUsernames();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes, showUsername]);

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
                      {showUsername && usernames && (
                        <p className="user">
                          By <span>{usernames[recipe.user] || "Unknown"}</span>
                        </p>
                      )}
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
