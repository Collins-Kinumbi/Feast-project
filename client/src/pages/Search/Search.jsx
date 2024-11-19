import { useEffect, useState } from "react";
import Recipe from "../../components/Recipe/Recipe";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [recipes, setRecipes] = useState([]);
  const [notFound, setNotFound] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      if (query) fetchResults();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  async function fetchResults() {
    if (!query) return;
    setIsLoading(true);
    setError(null);
    setNotFound(null);
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/recipes?search=${query.trim()}`
      );

      // console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch recipes. Please try again later.");
      }

      const resData = await response.json();
      // console.log(resData);
      const { recipes } = resData.data;

      if (recipes.length <= 0) {
        setNotFound("Sorry no recipes found!");
      }
      // console.log(recipes);
      setRecipes(recipes);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchResults();
  }

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Search..."
          value={query}
          onChange={(e) => setSearchParams({ query: e.target.value })}
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
      {notFound && <p className="error">{notFound}</p>}

      <div className="recipes-container">
        {recipes &&
          recipes.map((recipe) => {
            return <Recipe recipe={recipe} key={recipe._id} />;
          })}
      </div>
    </>
  );
}

export default Search;
