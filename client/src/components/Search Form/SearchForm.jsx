import "./search-form.css";

function SearchForm({ searchTerm, onSearchTermChange, onSubmit, isLoading }) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input
        type="text"
        required
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="field"
      />
      <input
        type="submit"
        value={isLoading ? "Searching..." : "Search"}
        disabled={isLoading}
      />
    </form>
  );
}

export default SearchForm;
