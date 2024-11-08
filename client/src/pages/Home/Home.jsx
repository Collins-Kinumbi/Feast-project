import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Components
import Recipe from "../../components/Recipe/Recipe";

function Home() {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    async function fetchRecipies() {
      try {
        const response = await fetch("http://localhost:4000/api/v1/recipes");

        // console.log(response);
        const resData = await response.json();
        // console.log(resData);
        const { recipes } = resData.data;
        console.log(recipes);
        setRecipes(recipes);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchRecipies();
  }, []);
  return (
    <div className="home">
      <Link to="/create" className="create">
        Create a recipe <span>+</span>
      </Link>
      <div className="recipes-container">
        {recipes &&
          recipes.map((recipe) => {
            return <Recipe recipe={recipe} key={recipe._id} />;
          })}
      </div>
    </div>
  );
}

export default Home;
