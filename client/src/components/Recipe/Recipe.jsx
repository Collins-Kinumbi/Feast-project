import { Link } from "react-router-dom";
import formatDate from "../../utils/Date";
import { useEffect, useState } from "react";

const userCache = new Map(); // Local cache for user data

function Recipe({ recipe }) {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchUsername(id) {
    if (userCache.has(id)) return userCache.get(id);

    const response = await fetch(`http://localhost:4000/api/v1/users/${id}`);
    if (!response.ok) throw new Error("Something went wrong.");
    const resData = await response.json();

    const username = resData.data.user.username;
    userCache.set(id, username);
    return username;
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedUsername = await fetchUsername(recipe.user);
        setUsername(fetchedUsername);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [recipe.user]);

  return (
    <Link to={`/recipe/${recipe._id}`}>
      <div className="recipe">
        <img src={recipe.image} alt={`${recipe.name}`} />
        <div className="content">
          <p className="uploadedOn">
            Uploaded on:{" "}
            <span>{formatDate(recipe.createdAt) || new Date()}</span>
          </p>
          <p className="recipeName">{recipe.name}</p>
          <p className="user">
            By{" "}
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <span>{error ? "Unknown" : username}</span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Recipe;
