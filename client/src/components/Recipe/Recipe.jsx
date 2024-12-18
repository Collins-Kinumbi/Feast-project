import { Link } from "react-router-dom";
import formatDate from "../../utils/Date";
import { useEffect, useState } from "react";

const userCache = new Map(); // Local cache for user data

function Recipe({ recipe }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getUser(id) {
      setError(null);

      // Check cache first
      if (userCache.has(id)) {
        setUsername(userCache.get(id));
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/users/${id}`
        );

        // console.log(response);
        if (!response.ok) {
          throw new Error("Sorry something went wrong...");
        }
        const resData = await response.json();

        const username = resData.data.user.username;

        // Update state and cache
        setUsername(username);
        userCache.set(id, username);
      } catch (error) {
        setError(error.message);
      }
    }
    getUser(recipe.user);
  }, [recipe.user]);

  return (
    <Link to={`/recipe/${recipe._id}`}>
      <div className="recipe">
        <img src={recipe.image} alt={`${recipe.name}`} />
        <div className="content">
          <p className="uploadedOn">
            Uploaded on: <span>{formatDate(recipe.createdAt)}</span>
          </p>
          <p className="recipeName">{recipe.name}</p>
          <p className="user">
            By <span>{error ? "Unknown" : username || "Loading..."}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Recipe;
