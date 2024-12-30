import "./error.css";
function Error({ message, onRetry }) {
  return (
    <div className="error-component">
      <p className="error-message">
        {message || "An error occurred. Please try again."}
      </p>
      {onRetry && (
        <button className="retry-button" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

export default Error;
