import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import Recipe from "../../components/Recipe/Recipe";
import { modalContext } from "../../contexts/Modal/modalContext";

function MyRecipes() {
  const { toggleModal } = useContext(modalContext);

  const [myRecipes, setMyRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1; // Get current page from URL
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchMyRecipes() {
      setError(null);
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/recipes/my-recipes?page=${currentPage}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch your recipes");
        }
        const data = await response.json();

        setMyRecipes(data.data.recipes);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMyRecipes();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage }); // Update URL with new page number
  };

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

      // Update recipes in the UI
      setMyRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== id)
      );
      toggleModal("feedback", {
        title: "Success",
        message: "Recipe deleted successfully",
        className: "success",
      });
    } catch (err) {
      toggleModal("feedback", {
        title: "Error",
        message: err.message,
        className: "error",
      });
    }
  };

  if (loading) return <p>Loading your recipes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="my-recipes">
        <h1 className="heading">My Recipes</h1>
        {myRecipes.length > 0 ? (
          <Recipe
            recipes={myRecipes}
            loading={loading}
            showUsername={false}
            showActions={true}
            onDelete={deleteRecipe}
          />
        ) : (
          <p>You haven't uploaded any recipes yet.</p>
        )}
      </div>
      {myRecipes.length > 0 && (
        <div className="pagination-container">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}

export default MyRecipes;
