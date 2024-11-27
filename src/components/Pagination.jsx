import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav aria-label="Page navigation example" className="flex justify-center items-center mt-4">
      <ul className="flex items-center space-x-1">
        <li>
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={`flex items-center px-4 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === 1}
            aria-label="Previous"
          >
            Prev
          </button>
        </li>

        <li>
          <span className="flex items-center px-4 py-2 text-sm text-gray-500 bg-white border border-gray-300">
            Page {currentPage} of {totalPages}
          </span>
        </li>

        <li>
          <button
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            className={`flex items-center px-4 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === totalPages}
            aria-label="Next"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
