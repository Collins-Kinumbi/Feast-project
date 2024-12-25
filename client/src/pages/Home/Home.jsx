import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Recipe from "../../components/Recipe/Recipe";
import Pagination from "../../components/Pagination/Pagination";
import Categories from "../../components/Categories/Categories";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const ITEMS_PER_PAGE = 10;

  // Get current page from URL params or default to 1
  const currentPage = Number(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(0);

  // Fetch recipes when `currentPage` changes
  useEffect(() => {
    async function fetchRecipes() {
      setIsLoading(true);
      try {
        setError(null);
        const response = await fetch(
          `http://localhost:4000/api/v1/recipes?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
        );

        if (!response.ok) {
          return setError("Sorry something went wrong...");
        }
        const resData = await response.json();
        const { recipes } = resData.data;

        setRecipes(recipes);
        setTotalPages(resData.totalPages); // Extract `totalPages` from API response
      } catch (error) {
        setError(error.message);
        setRecipes([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecipes();
  }, [currentPage]);

  // Handle page change and update URL parameter
  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <>
      <div className="home">
        <Categories />
        <Link to="/create" className="create">
          <span>+</span> Create
        </Link>
        {isLoading && <p className="loading">Loading recipes...</p>}
        {error && <p className="error">{error}</p>}
        <Recipe recipes={recipes} loading={isLoading} />
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
    </>
  );
}

export default Home;
