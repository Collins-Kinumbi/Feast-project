import { Link } from "react-router-dom";
import formatDate from "../../utils/Date";
import { useEffect, useState } from "react";
import RecipeCard from "../skeletons/Recipe/RecipeCard";

const userCache = new Map(); // Local cache for user data

function Recipe({ recipes, loading }) {
  const [usernames, setUsernames] = useState({});

  // Fetch username for a given user ID
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

    if (recipes.length > 0) {
      loadUsernames();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes]);

  return (
    <div className="recipes-container">
      {recipes.length > 0 &&
        recipes.map((recipe) => (
          <Link to={`/recipe/${recipe._id}`} key={recipe._id}>
            <div className="recipe">
              {loading ? (
                <RecipeCard />
              ) : (
                <>
                  <img src={recipe.image} alt={recipe.name} />
                  <div className="content">
                    <p className="uploadedOn">
                      Uploaded on:{" "}
                      <span>{formatDate(recipe.createdAt) || new Date()}</span>
                    </p>
                    <p className="recipeName">{recipe.name}</p>
                    {usernames && (
                      <p className="user">
                        By <span>{usernames[recipe.user] || "Unknown"}</span>
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Recipe;
