import "./recipe-card-skeleton.css";
import Skeleton from "react-loading-skeleton";

function RecipeCardSkeleton() {
  return (
    <div className="recipe-card-skeleton">
      <Skeleton width="100%" height="20rem" />
      <div className="content">
        <Skeleton count={3} />
      </div>
    </div>
  );
}

export default RecipeCardSkeleton;
