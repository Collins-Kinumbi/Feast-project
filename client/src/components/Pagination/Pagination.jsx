function Pagination({ currentPage, totalPages, onPageChange }) {
  const renderPageButtons = () => {
    if (totalPages <= 4) {
      // If 4 or fewer pages, show all
      return Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      ));
    } else {
      // More than 4 pages
      const buttons = [];

      // Always show first two pages
      buttons.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className={currentPage === 1 ? "active" : ""}
        >
          1
        </button>,
        <button
          key={2}
          onClick={() => onPageChange(2)}
          className={currentPage === 2 ? "active" : ""}
        >
          2
        </button>
      );

      // Add ellipsis if needed
      if (currentPage > 3) {
        buttons.push(
          <button key="ellipsis" disabled className="dots">
            ...
          </button>
        );
      }

      // Add current page if it's not 1, 2, or the last page
      if (currentPage > 2 && currentPage < totalPages) {
        buttons.push(
          <button
            key={currentPage}
            onClick={() => onPageChange(currentPage)}
            className="active"
          >
            {currentPage}
          </button>
        );
      }

      // Always show last page
      buttons.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={currentPage === totalPages ? "active" : ""}
        >
          {totalPages}
        </button>
      );

      return buttons;
    }
  };

  return (
    <div className="pagination-container">
      <div className="pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &#8249;
        </button>
        {renderPageButtons()}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}

export default Pagination;
