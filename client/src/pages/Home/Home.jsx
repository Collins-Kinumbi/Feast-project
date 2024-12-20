import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// Components
import Recipe from "../../components/Recipe/Recipe";
import Pagination from "../../components/Pagination/Pagination";

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

        // console.log(response);
        if (!response.ok) {
          return setError("Sorry something went wrong...");
        }
        const resData = await response.json();
        // console.log(resData);
        const { recipes } = resData.data;
        // console.log(recipes);
        setRecipes(recipes);
        setTotalPages(resData.totalPages); // Extract `totalPages` from API response
      } catch (error) {
        // console.log(error.message);
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
        <Link to="/create" className="create">
          <span>+</span> Create
        </Link>
        {isLoading && <p className="loading">Loading recipes...</p>}
        {error && <p className="error">{error}</p>}
        <div className="recipes-container">
          {recipes.length > 0 &&
            recipes.map((recipe) => {
              return <Recipe recipe={recipe} key={recipe._id} />;
            })}
        </div>
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
