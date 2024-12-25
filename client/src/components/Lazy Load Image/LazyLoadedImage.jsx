import { useState } from "react";

function LazyLoadedImage({ src, alt, className }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <img
      src={src || "images/placeholder/placeholder.jpg"}
      alt={alt}
      loading="lazy"
      className={`lazy-image ${isLoaded ? "loaded" : ""} ${className}`}
      onLoad={() => setIsLoaded(true)}
    />
  );
}

export default LazyLoadedImage;
