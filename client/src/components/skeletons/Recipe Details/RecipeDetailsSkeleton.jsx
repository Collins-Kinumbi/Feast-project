import Skeleton from "react-loading-skeleton";
import "./recipe-details-skeleton.css";

function RecipeDetailsSkeleton() {
  return (
    <div className="recipe-details-skeleton">
      <Skeleton width="100%" height="40rem" />
      <div className="content">
        <div className="name">
          <Skeleton count={1} />
        </div>
        <div className="description">
          <Skeleton count={1} />
        </div>
        <div className="categories">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="skeleton-wrapper">
              <Skeleton height="2rem" />
            </div>
          ))}
        </div>
        <div className="ingredients">
          <Skeleton count={4} />
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailsSkeleton;
