import { useEffect, useState } from "react";
import Recipe from "../../components/Recipe/Recipe";
import Pagination from "../../components/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";

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

  // This will only run when the form is submitted and a new search is initiated
  useEffect(
    () => {
      // If there is a query in URL, fetch the results for the first time
      if (query && currentPage) {
        fetchResults(currentPage);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, currentPage]
  );

  // Fetch results
  async function fetchResults(page = 1) {
    if (!query) return; // Skip fetch if no query exists

    setIsLoading(true);
    setError(null);
    setNotFound(null);

    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/recipes?search=${query.trim()}&page=${page}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recipes. Please try again later.");
      }

      const resData = await response.json();
      const { recipes } = resData.data;

      if (recipes.length === 0) {
        setNotFound("Sorry, no recipes found!");
      } else {
        setNotFound(null);
      }

      setRecipes(recipes);
      setTotalPages(resData.totalPages || 1);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

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
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="field"
          />
          <input
            type="submit"
            value="Search"
            className="button"
            disabled={isLoading}
          />
        </form>

        {isLoading && <p className="loading">Searching...</p>}
        {error && <p className="error">{error}</p>}
        {notFound && <p>{notFound}</p>}
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
    </div>
  );
}

export default Search;
