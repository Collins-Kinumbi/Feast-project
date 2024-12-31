import { Link, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Categories from "../../components/Categories/Categories";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import RecipeCard from "../../components/Recipe Card/Recipe-card";
import Pagination from "../../components/Pagination/Pagination";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  // Get current page from URL params or default to 1
  const currentPage = Number(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(0);

  const fetchRecipes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/recipes?page=${currentPage}`
      );

      const resData = await response.json();
      const { recipes } = resData.data;

      setRecipes(recipes || []);
      setTotalPages(resData.totalPages);
    } catch (error) {
      setError(
        error.message || "A network error occurred. Please try again..."
      );
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

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
        {isLoading && <Loading />}
        {error && <Error message={error} onRetry={() => fetchRecipes()} />}
        {recipes.length > 0 ? (
          <RecipeCard recipes={recipes} loading={isLoading} />
        ) : (
          !isLoading &&
          !error && <p className="no-recipes">Opps! no recipes here...</p>
        )}
      </div>
      {recipes.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default Home;
