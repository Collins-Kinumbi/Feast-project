import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../../components/Search Form/SearchForm";
import RecipeCard from "../../components/Recipe Card/Recipe-card";
import Pagination from "../../components/Pagination/Pagination";
import Error from "../../components/Error/Error";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const currentPage = Number(searchParams.get("page")) || 1; // Get current page from URL

  const [recipes, setRecipes] = useState([]);
  const [notFound, setNotFound] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState(query);
  const [totalPages, setTotalPages] = useState(0);

  const fetchResults = useCallback(
    async (page = 1) => {
      if (!query) return;

      setIsLoading(true);
      setError(null);
      setNotFound(null);

      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/recipes?search=${query.trim()}&page=${page}`
        );

        const resData = await response.json();
        const { recipes } = resData.data;

        if (recipes.length === 0) {
          setNotFound(`Sorry, no ${query} recipes found!`);
        } else {
          setNotFound(null);
        }

        setRecipes(recipes);
        setTotalPages(resData.totalPages || 1);
      } catch (error) {
        setError(error.message);
        setRecipes([]);
      } finally {
        setIsLoading(false);
      }
    },
    [query]
  );

  useEffect(() => {
    if (query && currentPage) {
      fetchResults(currentPage);
    }
  }, [query, currentPage, fetchResults]);

  // This will only run when the form is submitted and a new search is initiated
  useEffect(() => {
    // If there is a query in URL, fetch the results for the first time
    if (query && currentPage) {
      fetchResults(currentPage);
    }
  }, [query, currentPage, fetchResults]);

  // Fetch results

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    // Update URL query parameters and reset pagination to page 1
    setSearchParams({ query: searchTerm.trim(), page: 1 });
  }

  // Handle pagination
  const handlePageChange = (newPage) => {
    setSearchParams({ query, page: newPage }); // Maintain the current query, update page number
  };

  return (
    <div className="search-page">
      <div className="content">
        <SearchForm
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {error && <Error message={error} onRetry={() => fetchResults()} />}
        {notFound && <p className="no-recipes">{notFound}</p>}
        <RecipeCard recipes={recipes} loading={isLoading} />
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

export default Search;
