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
        });
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

  const deleteRecipe = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/recipes/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete recipe");
      }

      //state to manage recipes in the UI
      setMyRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== id)
      );
      alert("Recipe deleted successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading your recipes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>My Recipes</h1>
      <div className="recipes-container">
        {myRecipes.length > 0 ? (
          myRecipes.map((recipe) => (
            <MyRecipe
              key={recipe._id}
              recipe={recipe}
              onDelete={deleteRecipe}
            />
          ))
        ) : (
          <p>You haven't uploaded any recipes yet.</p>
        )}
      </div>
    </div>
  );
}

export default MyRecipes;
