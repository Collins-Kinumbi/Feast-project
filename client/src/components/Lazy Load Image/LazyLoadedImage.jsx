import { useState } from "react";

function LazyLoadedImage({ src, alt, className }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className="image-wrapper" style={{ position: "relative" }}>
      <img
        src={src || "images/placeholder/placeholder.jpg"}
        alt={alt}
        loading="lazy"
        className={`lazy-image ${isLoaded ? "loaded" : ""} ${className}`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}

export default LazyLoadedImage;
