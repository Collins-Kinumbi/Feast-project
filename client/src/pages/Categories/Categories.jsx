import { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import RecipeCard from "../../components/Recipe Card/Recipe-card";
import Pagination from "../../components/Pagination/Pagination";

function Categories() {
  const { category } = useParams(); // Get category from URL params
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const fetchCategoryRecipes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/recipes?category=${category}&page=${currentPage}`
      );

      const resData = await response.json();

      const { recipes } = resData.data;
      setRecipes(recipes || []);
      setTotalPages(resData.totalPages);
    } catch (err) {
      setError(err.message);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, category]);

  useEffect(() => {
    fetchCategoryRecipes();
  }, [fetchCategoryRecipes]);

  // Handle page change
  function handlePageChange(newPage) {
    setSearchParams({ page: newPage }); // Update page in URL params
  }

  return (
    <div className="categories-page">
      <h1 className="heading">{category} Recipes</h1>
      <div className="content">
        {error && (
          <Error message={error} onRetry={() => fetchCategoryRecipes()} />
        )}
        {isLoading ? (
          <Loading />
        ) : recipes.length > 0 ? (
          <RecipeCard recipes={recipes} loading={isLoading} />
        ) : (
          !isLoading &&
          !error && <p className="no-recipes">OOOPS! nothing here yet...</p>
        )}
      </div>
      {recipes.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default Categories;
