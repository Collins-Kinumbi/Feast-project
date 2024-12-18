import { useEffect, useState } from "react";

import MyRecipe from "../../components/My Recipe/MyRecipe";

function MyRecipes() {
  const [myRecipes, setMyRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyRecipes() {
      setError(null);
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4000/api/v1/recipes", {
          method: "GET",
          credentials: "include",
        }); // Adjust the endpoint as per your setup
        if (!response.ok) {
          throw new Error("Failed to fetch your recipes");
        }
        const data = await response.json();

        setMyRecipes(data.data.recipes);
        console.log(data.data.recipes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMyRecipes();
  }, []);

  if (loading) return <p>Loading your recipes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>My Recipes</h1>
      <div className="recipes-container">
        {myRecipes.length > 0 ? (
          myRecipes.map((recipe) => (
            <MyRecipe key={recipe._id} recipe={recipe} />
          ))
        ) : (
          <p>You haven't uploaded any recipes yet.</p>
        )}
      </div>
    </div>
  );
}

export default MyRecipes;
