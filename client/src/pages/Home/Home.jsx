import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Recipe from "../../components/Recipe/Recipe";
import Pagination from "../../components/Pagination/Pagination";
import Categories from "../../components/Categories/Categories";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const ITEMS_PER_PAGE = 10;

  // Fetch all recipes
  useEffect(() => {
    async function fetchRecipies() {
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
    fetchRecipies();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
