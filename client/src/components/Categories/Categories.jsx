import "./categories.css";
import { Link } from "react-router-dom";
import categoriesList from "../../utils/Categories";
import { useState, useRef } from "react";

function Categories() {
  // eslint-disable-next-line
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 200; // Adjusts scroll amount
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 200; // Adjusts scroll amount
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };
  return (
    <div className="category-carousel">
      {/* Left Arrow */}
      <button className="arrow-btn left" onClick={scrollLeft}>
        &#8249;
      </button>

      {/* Category List */}
      <div className="categories-container" ref={scrollContainerRef}>
        {categoriesList.map((category, index) => (
          <Link
            key={index}
            to={`/categories/${category}`}
            className="category-item"
          >
            {category}
          </Link>
        ))}
      </div>

      {/* Right Arrow */}
      <button className="arrow-btn right" onClick={scrollRight}>
        &#8250;
      </button>
    </div>
  );
}

export default Categories;
