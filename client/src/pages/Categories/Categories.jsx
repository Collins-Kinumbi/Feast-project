import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Recipe from "../../components/Recipe/Recipe";
import Pagination from "../../components/Pagination/Pagination";
import Loading from "../../components/Loading/Loading";

function Categories() {
  const { category } = useParams(); // Get category from URL params
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchCategoryRecipes() {
      setIsLoading(true);
      try {
        setError(null);
        const response = await fetch(
          `http://localhost:4000/api/v1/recipes?category=${category}&page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipes for the selected category.");
        }
        const resData = await response.json();
        setRecipes(resData.data.recipes);
        setTotalPages(resData.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategoryRecipes();
  }, [category, currentPage]);

  // Handle page change
  function handlePageChange(newPage) {
    setSearchParams({ page: newPage }); // Update page in URL params
  }

  return (
    <div className="categories-page">
      <h1 className="heading">{category} Recipes</h1>
      <div className="content">
        {error && <p className="error">{error}</p>}
        {isLoading ? (
          <Loading />
        ) : recipes.length > 0 ? (
          <>
            <Recipe recipes={recipes} loading={isLoading} />
          </>
        ) : (
          <p>OOOPS! guess there are no {category} recipes yet.</p>
        )}
      </div>
      {recipes.length > 0 && (
        <div className="pagination-container">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default Categories;
