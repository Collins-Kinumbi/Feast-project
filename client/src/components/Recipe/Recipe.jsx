function Recipe({ recipe }) {
  return (
    <div className="recipe">
      <img src="images/placeholder/placeholder.png" alt={`${recipe.name}`} />
      <div className="content">
        <p className="uploadedOn">
          Uploaded on: <span>{recipe.createdAt}</span>
        </p>
        <p className="recipeName">{recipe.name}</p>
        <p className="user">
          By <span>{recipe.user}</span>
        </p>
      </div>
    </div>
  );
}

export default Recipe;
