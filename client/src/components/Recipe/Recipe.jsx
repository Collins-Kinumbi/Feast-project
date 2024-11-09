function Recipe({ recipe }) {
  // Date formatting
  const date = new Date(recipe.createdAt);

  const uploadedOn = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="recipe">
      <img src="images/placeholder/placeholder.png" alt={`${recipe.name}`} />
      <div className="content">
        <p className="uploadedOn">
          Uploaded on: <span>{uploadedOn}</span>
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
