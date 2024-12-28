function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxPagesToShow = 4; // Maximum number of page buttons to show
  const pages = [];

  // Generate a simple range of pages
  if (totalPages <= maxPagesToShow) {
    // If the total pages are less than or equal to the max, show all pages
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Else generate an appropriate range, including ellipses
    if (currentPage <= 3) {
      // If the current page is in the first part, show 1-4
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push("..."); // Show ellipsis after the first few pages
    } else if (currentPage >= totalPages - 2) {
      // If the current page is near the last part, show last 4 pages
      pages.push(1); // Always show 1
      pages.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Otherwise, display current page in the middle with ellipses on both sides
      pages.push(1); // Always show 1
      pages.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages); // Always show last page
    }
  }

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &#8249;
      </button>
      {pages.map((page, index) =>
        page === "..." ? (
          <button key={index} disabled className="dots">
            ...
          </button>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &#8250;
      </button>
    </div>
  );
}

export default Pagination;
