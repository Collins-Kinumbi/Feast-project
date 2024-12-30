import { useState } from "react";

function LazyLoadedImage({ src, alt, className }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const imageSrc = typeof src === "object" ? src.url : src;
  const placeholderSrc = "/images/placeholder/placeholder.jpg";

  return (
    <img
      src={error ? placeholderSrc : imageSrc || placeholderSrc}
      alt={alt}
      loading="lazy"
      className={`lazy-image ${isLoaded ? "loaded" : ""} ${className}`}
      onLoad={() => setIsLoaded(true)}
      onError={() => setError(true)}
    />
  );
}

export default LazyLoadedImage;
