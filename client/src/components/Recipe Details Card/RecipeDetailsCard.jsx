import formatDate from "../../utils/Date";
import LazyLoadedImage from "../Lazy Load Image/LazyLoadedImage";
import UsernameCard from "../Username/UsernameCard";
import RecipeDetailsSkeleton from "../skeletons/Recipe Details/RecipeDetailsSkeleton";

function RecipeDetailsCard({ recipe, loading = false }) {
  if (loading) {
    return <RecipeDetailsSkeleton />;
  }

  return (
    <>
      {recipe && (
        <div className="recipe-container">
          <div>
            <LazyLoadedImage src={recipe.image} alt={recipe.name} />
          </div>
          <div className="content">
            <h1>{recipe.name}</h1>
            <p className="description">{recipe.description}</p>
            <div>
              <UsernameCard userId={recipe.user} />
              <p className="created-on">
                Created on: <span>{formatDate(recipe.createdAt)}</span>
              </p>
              <div className="categories">
                <h2>Categories:</h2>
                <ul>
                  {recipe.categories.map((category) => (
                    <li key={category}>
                      <p>{category}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="ingredients">
              <h2>Ingredients:</h2>
              <ul>
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="instructions">
              <h2>Instructions:</h2>
              <ul>
                {recipe.instructions.map((instruction) => (
                  <li key={instruction}>{instruction}</li>
                ))}
              </ul>
            </div>
            <div className="nutrition">
              <p>
                The table below shows nutritional values per serving without the
                additional fillings.
              </p>
              <h2>Nutrition:</h2>
              <div>
                <p>Calories</p>
                <span>{recipe.nutrition.calories}kcal</span>
              </div>
              <div>
                <p>Carbs</p>
                <span>{recipe.nutrition.carbohydrates}g</span>
              </div>
              <div>
                <p>Proteins</p>
                <span>{recipe.nutrition.proteins}g</span>
              </div>
              <div>
                <p>Fats</p>
                <span>{recipe.nutrition.fats}g</span>
              </div>
            </div>
            <div className="serving">
              <h2>Serving:</h2>
              <div>
                <p>
                  Serving: <span>{recipe.serving}</span>
                </p>
                <p>
                  Serving yield: <span>{recipe.servingYield}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RecipeDetailsCard;
